import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import BpmnModeler from 'bpmn-js/lib/Modeler'

import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css'
import '../style.css'

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel'

import defaultDiagram from "../../resources/newDiagram.bpmn?raw"

export default function Editor() {
  const canvasRef = useRef(null)
  const propertiesRef = useRef(null)
  const modelerRef = useRef(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const diagramId = searchParams.get('diagramId')

  const [originalXML, setOriginalXML] = useState('')

  useEffect(() => {
    const modeler = new BpmnModeler({
      container: canvasRef.current,
      propertiesPanel: {
        parent: propertiesRef.current
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule
      ]
    })

    modelerRef.current = modeler

    const loadDiagram = async () => {
      if (diagramId) {
        try {
          const res = await fetch(`/api/diagrams/${diagramId}`)
          const data = await res.json()

          const xml = data?.xmlContent?.trim()

          if (xml && (xml.startsWith('<?xml') || xml.startsWith('<bpmn:definitions'))) {
            await openDiagram(xml)
            setOriginalXML(xml)
          } else {
            console.warn('⛔ XML rỗng hoặc sai format → fallback')
            await openDiagram(defaultDiagram)
            setOriginalXML(defaultDiagram)
          }
        } catch (err) {
          console.error('❌ Lỗi khi lấy sơ đồ:', err)
          await openDiagram(defaultDiagram)
          setOriginalXML(defaultDiagram)
        }
      } else {
        await openDiagram(defaultDiagram)
        setOriginalXML(defaultDiagram)
      }
    }

    loadDiagram()

    modeler.on('commandStack.changed', exportArtifacts)

    return () => modeler.destroy()
  }, [diagramId])

  const openDiagram = async (xml) => {
    if (!xml || typeof xml !== 'string' || xml.trim() === '') {
      console.warn('⛔ XML không hợp lệ, bỏ qua import')
      return
    }
    try {
      await modelerRef.current.importXML(xml)
    } catch (err) {
      console.error('🚫 Import failed', err)
    }
  }

  async function createNewDiagram() {
    openDiagram(defaultDiagram)
    setOriginalXML(defaultDiagram)
  }

  async function exportArtifacts() {
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true })
      const { svg } = await modelerRef.current.saveSVG()
      console.log('Exported XML/SVG:', { xml, svg })
    } catch (err) {
      console.error('Export failed', err)
    }
  }

  async function saveToServer() {
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true })
      if (xml.trim() === originalXML.trim()) {
        alert('⛔ Không có thay đổi gì để lưu.')
        return
      }

      const res = await fetch(`/api/diagrams/${diagramId}`, {
        method: 'PUT',
        body: JSON.stringify({ xmlContent: xml }),
        headers: { 'Content-Type': 'application/json' }
      })

      const result = await res.json()
      alert('✅ Đã lưu thành công ID: ' + result.id)
      setOriginalXML(xml)
    } catch (err) {
      console.error('Lỗi khi lưu sơ đồ:', err)
    }
  }

  return (
    <div className="editor-container">
      <div style={{ display: 'flex', height: '100vh' }}>
        <div ref={canvasRef} style={{ flex: 1, border: '1px solid #ccc' }} />
        <div ref={propertiesRef} style={{ width: '300px', borderLeft: '1px solid #ccc' }} />
      </div>

      <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={createNewDiagram}>Tạo mới</button>
        <button onClick={saveToServer}>Lưu lên server</button>
        <button onClick={() => navigate('/testcaselist')}>← Quay lại</button>
      </div>
    </div>
  )
}
