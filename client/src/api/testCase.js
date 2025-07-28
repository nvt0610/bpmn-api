export async function getTestCases() {
  const res = await fetch('/api/testcases')
  if (!res.ok) throw new Error('Lỗi khi lấy danh sách test case')
  return await res.json()
}

export async function createTestCase(data) {
  const res = await fetch('/api/testcases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Tạo test case thất bại')
  return await res.json()
}

export async function updateTestCase(id, data) {
  const res = await fetch(`/api/testcases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Cập nhật test case thất bại')
  return await res.json()
}

export async function deleteTestCase(id) {
  const res = await fetch(`/api/testcases/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Xoá test case thất bại')
  return await res.json()
}
