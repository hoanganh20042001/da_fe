import React, { useState, useEffect, Fragment } from 'react'
import Viewer from 'react-viewer'
import { ChevronDown, CheckCircle, Printer, FileText, File, Grid, Copy, Plus, Edit, Trash, Check, Slash, X } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Button, Form, FormGroup, Label, FormFeedback, Input  } from 'reactstrap'
import { FaCamera } from 'react-icons/fa'
import loadingGif from 'D:/DA/FE_AI/src/assets/images/logo/logo1.png'
// import './styles.css'

const ManageDetect = () => {
  const [imageSrc, setImageSrc] = useState(null)
  const [fixViewer, setFixViewer] = useState(false)
  const [fileName, setFileName] = useState('')
  const [cccd, setCccd] = useState('')
  const [isValid, setIsValid] = useState(true)

  const validateCccd = (value) => {
    const cccdRegex = /^[0-9]{12}$/ // Định dạng CCCD là 12 chữ số
    return cccdRegex.test(value)
  }

  const handleInputChange = (event) => {
    const value = event.target.value
    setCccd(value)

    // Kiểm tra xem giá trị nhập có hợp lệ không
    if (validateCccd(value)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }
  useEffect(() => {
    const fixViewerInterval = setInterval(() => {
      setFixViewer(true)
    }, 3000)

    return () => clearInterval(fixViewerInterval)  // Clean up the interval on component unmount
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const src = URL.createObjectURL(file)
      setImageSrc(src)
      setFileName(file.name)
    } else {
      setFileName('')
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4' style={{ fontWeight: 'bold', color: '#1203b1' }}>KHÁM BỆNH</CardTitle>
          {/* <div className='d-flex mt-md-0 mt-1'>
            {
              <Button className='ms-2' color='primary' onClick={() => setShowAdd(true)}> <Plus size={15} /> <span className='align-middle ms-50'>Thêm bộ dữ liệu</span> </Button>
            }
          </div> */}
        </CardHeader>
        <CardBody>
        <Row style={{ backgroundColor: '#f0f0f0'}}>
          <Col lg='8' >
            <Row style={{ marginLeft: '10px' }}>
              <Col md={5}>
                <Form>
                  <FormGroup>
                    <Label for="cccdInput">CĂN CƯỚC CÔNG DÂN</Label>
                    <Input
                      type="text"
                      id="cccdInput"
                      placeholder="Nhập số CCCD"
                      value={cccd}
                      onChange={handleInputChange}
                      invalid={!isValid} // Đặt trạng thái hợp lệ của input
                    />
                    <FormFeedback invalid="true">
                      Số CCCD phải là 12 chữ số.
                    </FormFeedback>
                  </FormGroup>
                </Form>
              </Col>
              <Col md={2}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                <Label for="cccdInput">TẢI ẢNH</Label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".png, .jpg, .jpeg"
                    style={{
                      opacity: 0,
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 2,
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>📁</span> Upload
                  </button>
                </div>
              </Col>
              <Col md={5}>
              {fileName && (
                    <div style={{ fontSize: '14px' }}>
                      <Label for="cccdInput">ẢNH ĐÃ TẢI LÊN</Label>
                    <div><strong>{fileName}</strong> </div>
                    </div>
                  )}</Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card style={{position: 'relative', overflow: 'hidden' }}>
                  <CardBody style={{ height: '100%', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {imageSrc ? (
                      <Viewer
                        noClose
                        visible={true}  // Always keep the viewer visible
                        images={[{ src: imageSrc, alt: 'Uploaded Image' }]}
                        noFooter={false}
                        noNavbar={true}
                        noToolbar={false}
                        changeable={false}
                        attribute={false}
                        scalable={false}
                        container={document.getElementById('container')}
                        className="viewer-container"
                        style={{
                          width: '100%',
                          height: '150%',
                          minHeight: '800px',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#6c757d' }}>
                        <FaCamera size={600} />
                        {/* <Image src={loadingGif} alt="Loading" /> */}
                        <p>Chưa có hình ảnh nào được tải lên</p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div id='container' className='container' style={{ height: '80%' }} />

          </Col>
          <Col lg='4'>
          <Row style={{ textAlign: 'center', marginTop: '12px' }}>
          <Label style={{ fontWeight: 'bold' }}>THÔNG TIN</Label>
          </Row>
          <Row></Row>
          </Col>
        </Row>
        </CardBody>
      </Card>
      <style>
        {`
          .react-viewer-inline {
            min-height: 650px !important;
          }
        `}
      </style>
    </Fragment>
  )
}

// const rootElement = document.getElementById('root')
// ReactDOM.render(<ManageDetect />, rootElement)

export default ManageDetect
