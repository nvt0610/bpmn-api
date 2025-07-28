// client/src/api/diagram.js

export async function getDiagrams() {
  const res = await fetch('/api/diagrams');
  if (!res.ok) throw new Error('Lỗi khi lấy danh sách diagram');
  return await res.json();
}

export async function getDiagramById(id) {
  const res = await fetch(`/api/diagrams/${id}`);
  if (!res.ok) throw new Error('Lỗi khi lấy diagram theo ID');
  return await res.json();
}

export async function createDiagram(data) {
  const res = await fetch('/api/diagrams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Lỗi khi tạo diagram');
  return await res.json();
}

export async function updateDiagram(id, data) {
  const res = await fetch(`/api/diagrams/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Lỗi khi cập nhật diagram');
  return await res.json();
}

export async function deleteDiagram(id) {
  const res = await fetch(`/api/diagrams/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Lỗi khi xoá diagram');
  return await res.json();
}
