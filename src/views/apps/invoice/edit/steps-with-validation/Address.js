// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { addExp } from '@store/action/experiment'
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, Table } from 'reactstrap'
import axios from 'axios'
const defaultValues = {
  city: '',
  pincode: '',
  address: '',
  landmark: ''
}

const Address = ({ stepper, infoExp, changeInfo, info }) => {
  const dispatch = useDispatch()
  const [list, setList] = useState([])
  const [stringconfig, setConfig] = useState()
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const handleOnChange = (value, pop) => {
    changeInfo(value, pop)
  }
  
  const [valErrors, setValErrors] = useState('')
  const handleChangeConfig = (item) => {
    setValErrors('')
    changeInfo(item.configid, 'configid')
    setConfig(item.jsonstringparams)
  }
  
  const ChangeConfig = (value) => {
    if (value.trim() !== "") {
      setValErrors('')
    } else {
      setValErrors('Không được để trống')
    }
    setConfig(value)
  }
  const onSubmit = data => {
    if (stringconfig !== undefined) {
      if (stringconfig.trim() !== '') {
        if (!list.find(item => item.jsonstringparams === stringconfig)) {
          const url = process.env.REACT_APP_API_URL
          axios.get(`${url}/experiment/start-train/?id_exp=${infoExp.expid}&paramsconfigs_json=${stringconfig}`, {
            headers: {
              'content-type': 'application/json'  
              // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }).then(response => {
            handleOnChange(response.data.configid, 'configid')
          })
        }
  
      }
      setValErrors('')
      stepper.next()
      } else {
      setValErrors('Không được để trống')

      }
      
  }

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    axios.get(`${url}/experiment/list-paramsconfigs/?id_exp=${infoExp.expid}`).then(response => {
      setList(response.data)
    })
  }, [])
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Cấu hình tham số huấn luyện</h5>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Các chuỗi config đã thử nghiệm</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map(item => {
              return (
                <tr onClick={e => handleChangeConfig(item)}>{item.jsonstringparams}</tr>
              )
            })
          }
        </tbody>
      </Table>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='address'>
              Cấu hình tham số mới
            </Label>
            <Input type='textarea' placeholder='Cấu hình các tham số' value={stringconfig} onChange={e => ChangeConfig(e.target.value)} />
          </Col>
        </Row>

        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Quay lại</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next' disabled={valErrors !== ""}>
            <span className='align-middle d-sm-inline-block d-none' >Huấn luyện</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
