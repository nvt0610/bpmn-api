import React from 'react';
import { useTestCases } from '../hooks/useTestCases';

function TestCaseList() {
  const {
    testCases,
    form,
    setForm,
    editingId,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleViewDiagram,
    cancelEdit
  } = useTestCases();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Test Cases</h2>

      <form className="space-y-2 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border px-2 py-1 w-full"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Mô tả test case"
          className="border px-2 py-1 w-full"
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Diagram ID (tuỳ chọn)"
          className="border px-2 py-1 w-full"
          value={form.diagramId}
          onChange={e => setForm({ ...form, diagramId: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          {editingId ? 'Cập nhật' : 'Tạo mới'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="ml-2 bg-gray-500 text-white px-4 py-1 rounded"
          >
            Huỷ
          </button>
        )}
      </form>

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">ID</th>
            <th className="px-3 py-2 border">Name</th>
            <th className="px-3 py-2 border">Mô tả</th>
            <th className="px-3 py-2 border">Diagram</th>
            <th className="px-3 py-2 border">Creator</th>
            <th className="px-3 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map(tc => (
            <tr key={tc.id} className="hover:bg-gray-50">
              <td className="px-3 py-2 border text-center">{tc.id}</td>
              <td className="px-3 py-2 border">{tc.name}</td>
              <td className="px-3 py-2 border">{tc.description || '-'}</td>
              <td className="px-3 py-2 border">{tc.diagram?.name || '-'}</td>
              <td className="px-3 py-2 border">{tc.creator?.username || '-'}</td>
              <td className="px-3 py-2 border text-center space-x-2">
                <button
                  onClick={() => handleEdit(tc)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(tc.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Xoá
                </button>
                <button
                  onClick={() => handleViewDiagram(tc.diagramId)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Xem sơ đồ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestCaseList;
