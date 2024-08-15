// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FileUploaderSingle from './FileUploaderSingle'
import { getListModelBySoftID } from '@store/action/model'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// const defaultValues = {
//   lastName: '',
//   firstName: ''
// }

const ExpReport = ({ stepper, infoExp, changeInfo }) => {
  // ** Hooks
//   const dispatch = useDispatch()
    console.log('infoExp:', infoExp)
    const selectThemeColors = (theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#dae1e7', // màu khi hover
          primary: '#1b4d89',   // màu chủ đạo
        },
    })
    const [displaySelect, setDisplay] = useState(false)
    const [display, setDisplayModal] = useState(true)
    const toggleModal = () => setDisplayModal(!display)
    const defaultValues = {
        lastName: '',
        firstName: ''
    }
    const languageOptions = [
        { value: 1, label: 'Nhận diện khuôn mặt' },
        { value: 2, label: 'Nhận dạng sự kiện bất thường' },
        { value: 3, label: 'Phát hiện khuôn mặt' },
    ]
    const dataDataset = useSelector((state) => {
        return state.dataset.dataDataset
    })
    const dataModel = useSelector((state) => {
        return state.model.dataModel
      })
    const {
        handleSubmit
      } = useForm({ defaultValues })
    const onSubmit = () => {
        // if (Object.values(data).every(field => field.length > 0)) {
        stepper.next()
    
    }
    const [infoModel, setModel] = useState({
        id: 1,
        datasetdescription: '',
        datasetfolderurl: '',
        datasetname: '',
        datasetowner: 1,
        datasetsoftID: 1,
        datasetsum: 1,
        datasettype: 1,
      })
    const ChangeLisData = (dataDataset) => {
        const list = []
        dataDataset.map(item => {
          list.push({
            value: JSON.stringify({
              id: item.datasetid,
              datasetdescription: item.datasetdescription,
              datasetfolderurl: item.datasetfolderurl,
              datasetname: item.datasetname,
              datasetowner: item.datasetowner,
              datasetsoftID: item.datasetsoftID,
              datasetsum: item.datasetsum,
              datasettype: item.datasettype,
            }),
            label: item.datasetname
          })
        })
        return list
      }
      const ChangeLisModel = (dataDataset) => {
        const list = []
        console.log(dataDataset)
        dataDataset.map(item => {
          list.push({
            value: JSON.stringify({
              id: item.modelid,
              modelfiletutorial: item.modelfiletutorial,
              modeldescription: item.modeldescription,
              modelname: item.modelname,
              modeleventtype: item.modeleventtype,
              default_json_Paramsconfigs: item.default_json_Paramsconfigs
            }),
            label: item.modelname
          })
        })
        return list
      }
    return (
    <Fragment>
       <div>
        <Row>
          <Col className='p-0' xl='8'>
            <div className='content-header'>
              <h5 className='mb-0'>Tổng quan bài thí nghiệm</h5>
            </div>
          </Col>
        </Row>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='city'>
              Danh sách bài toán
            </Label>
          </Col>
        </Row>
        <Row>
            <Col md='8' className='mb-1'>
            <Select
                isMulti={false}
                isClearable={false}
                placeholder={'Xem danh sách bài toán'}
                theme={selectThemeColors}
                id={`language`}
                options={languageOptions}
                value={languageOptions.find(option => option.value === infoExp.expsoftwarelibid)}
                className='react-select'
                classNamePrefix='select'
                isDisabled={false}
                onChange={(e) => console.log(e.value)}
            />
            </Col>
        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='city'>
              Danh sách bộ dữ liệu
            </Label>
          </Col>
        </Row>
        <Row>
        <Col md='8' className='mb-1'>
            <Select
              isMulti={false}
              isClearable={false}
              theme={selectThemeColors}
              placeholder={'Xem danh sách bộ dữ liệu'}
              id={`language`}
              options={ChangeLisData(dataDataset)}
              className='react-select'
              classNamePrefix='select'
              isDisabled={displaySelect}
            //   value={setData(dataDataset)}
              onChange={(e) => console.log(e.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='city'>
              Danh sách mô hình
            </Label>
          </Col>
        </Row>
        <Row>
            <Col md='8' className='mb-1'>
                <Select
                isMulti={false}
                isClearable={false}
                theme={selectThemeColors}
                placeholder={'Xem danh sách mô hình'}
                id={`language`}
                options={ChangeLisModel(dataModel)}
                className='react-select'
                classNamePrefix='select'
                isDisabled={displaySelect}
                //   value={setModel(dataModel)}
                onChange={(e) => console.log(e.value)}
                />
            </Col>
        </Row>
        <div className='d-flex justify-content-end'>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Tiếp theo</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
      
    </Fragment>
  )
}

export default ExpReport
