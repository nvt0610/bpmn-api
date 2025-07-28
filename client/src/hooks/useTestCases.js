import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiagram } from '../api/diagram'; // nhớ import
import {
    getTestCases,
    createTestCase,
    updateTestCase,
    deleteTestCase
} from '../api/testCase';
import defaultDiagram from "../../resources/newDiagram.bpmn?raw"

export function useTestCases() {
    const [testCases, setTestCases] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', diagramId: '' });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const createdBy = user?.id;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getTestCases();
            setTestCases(data);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) return alert('Chưa đăng nhập');

        let diagramId = form.diagramId;

        if (!diagramId) {
            const confirmAuto = confirm(`Test case "${form.name}" không có diagram. Hệ thống sẽ tự tạo sơ đồ mới tên "${form.name}-auto".`);
            if (!confirmAuto) return;

            try {
                const newDiagram = await createDiagram({
                    name: `${form.name}`,
                    xmlContent: defaultDiagram,
                    type: 'GENERAL',
                    createdBy: user.id,
                });
                diagramId = newDiagram.id;
            } catch (err) {
                console.error('Lỗi khi tạo sơ đồ:', err);
                return alert('Tạo sơ đồ mới thất bại');
            }
        }

        const payload = {
            name: form.name,
            description: form.description || '',
            createdBy: user.id,
            diagramId: parseInt(diagramId)
        };

        try {
            if (editingId) {
                await updateTestCase(editingId, payload);
            } else {
                await createTestCase(payload);
            }

            setForm({ name: '', description: '', diagramId: '' });
            setEditingId(null);
            fetchData();
        } catch (err) {
            console.error('Lỗi khi tạo/cập nhật:', err);
        }
    };

    const handleEdit = (tc) => {
        setForm({
            name: tc.name,
            description: tc.description || '',
            diagramId: tc.diagramId || ''
        });
        setEditingId(tc.id);
    };

    const handleDelete = async (id) => {
        if (!confirm('Xác nhận xoá?')) return;
        try {
            await deleteTestCase(id);
            fetchData();
        } catch (err) {
            console.error('Lỗi khi xoá:', err);
        }
    };

    const handleViewDiagram = (diagramId) => {
        if (diagramId) {
            navigate(`/editor?diagramId=${diagramId}`);
        } else {
            alert('Test case này chưa liên kết sơ đồ');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({ name: '', description: '', diagramId: '' });
    };

    return {
        testCases,
        form,
        setForm,
        editingId,
        setEditingId,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleViewDiagram,
        cancelEdit
    };
}
