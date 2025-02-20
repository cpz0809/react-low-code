import { useEffect, useRef, useState } from 'react'
import './index.scss'
import {
  CheckOutlined,
  DownOutlined,
  LeftOutlined,
  LockOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  UnlockOutlined
} from '@ant-design/icons'
import {
  Divider,
  Dropdown,
  Form,
  Input,
  InputRef,
  Modal,
  Space,
  Tooltip
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import {
  changeColors,
  items,
  selectScales
} from '@/view/project-manage/items.tsx'
import ProjectView from '@/view/project-manage/ProjectView.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { queryPageList } from '@/api/page.ts'
import { CanvasElement } from '@/view/project-manage/_types.ts'

// const EditorScale = 'editorScale'
// const AngleViewPositionX = 'angleViewPositionX'
// const AngleViewPositionY = 'angleViewPositionY'

const ProjectManage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [renameForm] = useForm()
  const [pageConfigForm] = useForm()

  const renameRef = useRef<InputRef>(null)
  const searchPageRef = useRef<InputRef>(null)
  const canvas = useRef<any>()

  // 是否打开右键菜单
  const [isOpenContextMenu, setIsOpenContextMenu] = useState<boolean>(false)
  // 右键菜单打开位置
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0
  })
  // 当前选中的元素
  const [currentElement, setCurrentElement] = useState<CanvasElement | null>(
    null
  )
  // 缩放比例
  const [scale, setScale] = useState(1)
  // 画布是否锁定
  const [isCanvasLock, setIsCanvasLock] = useState(false)
  // 是否打开更改颜色背景框
  const [isOpenChangeColor, setIsOpenChangeColor] = useState<boolean>(false)
  // 当前背景颜色
  const [currentBgColor, setCurrentBgColor] = useState<string>(
    changeColors[1].bgColor
  )
  // 重命名弹窗
  const [isRename, setIsRename] = useState<boolean>(false)
  // 重命名Input Value
  const [rename, setRename] = useState<string>('')
  // 是否搜索页面
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false)
  // 搜索页面值
  const [searchPage, setSearchPage] = useState<string>('')
  // 添加页面弹窗状态
  const [isOpenEditPage, setIsOpenEditPage] = useState(false)
  // 添加页面表单
  const [pageConfig, setPageConfig] = useState({
    pageName: '',
    pagePath: ''
  })
  // 页面列表
  const [pageList, setPageList] = useState<CanvasElement[]>([])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      init()
    })()
  }, [])

  useEffect(() => {
    if (!isSearchPage || !searchPageRef.current) return
    searchPageRef.current.focus()
  }, [isSearchPage])

  const init = async () => {
    const list = await queryPageList<CanvasElement[]>(
      searchParams.get('projectCode') as string
    )
    list.forEach((item, index) => {
      const image = new Image()
      image.src = item.pageCoverImage
      item.positionX = item.positionX * (index + 1)
      item.image = image
      item.isSelected = false
    })
    setPageList(list)
  }

  const handleRenameOk = async () => {
    try {
      await renameForm.validateFields()
    } catch {
      /* empty */
    }
  }
  const handleCancelRename = () => {
    setIsRename(false)
  }

  const handleSearchPage = (e: any) => {
    setSearchPage(e.target.value)
  }

  const handleEditPage = () => {}

  const handleResetEditPage = () => {
    setPageConfig({
      pageName: '',
      pagePath: ''
    })
    setIsOpenEditPage(false)
  }

  const handleContextMenu = (position: { x: number; y: number }, el: any) => {
    setContextMenuPosition(position)
    setIsOpenContextMenu(true)
    setCurrentElement(el)
  }

  return (
    <div className="project-manage">
      {/*{canvas?.current?.isLoading && (*/}
      {/*  <div className="project-manage-loading-wrapper">*/}
      {/*    <LoadingOutlined className="project-manage-loading" />*/}
      {/*    <p className="project-manage-text">正在加载</p>*/}
      {/*  </div>*/}
      {/*)}*/}

      <div className="project-manage-navbar">
        <div className="project-manage-left">
          <div className="project-manage-go-back" onClick={() => navigate(-1)}>
            <LeftOutlined />
          </div>
          <Dropdown menu={{ items }} trigger={['click']}>
            <div className="project-manage-dropdown-wrapper">
              <p className="project-manage-dropdown-text">11111111</p>
              <DownOutlined className="project-manage-dropdown-icon" />
            </div>
          </Dropdown>
        </div>
        <div className="project-manage-center"></div>
        <div className="project-manage-right"></div>
      </div>

      <div className="project-manage-content">
        {/*  侧边栏  */}
        <div className="project-manage-side-bar">
          <div className="project-manage-side-bar-head">
            {isSearchPage ? (
              <Input
                ref={searchPageRef}
                placeholder="搜索页面"
                className="project-manage-side-search-page"
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.5)' }} />}
                onBlur={() => setIsSearchPage(false)}
                onChange={handleSearchPage}
                value={searchPage}
              />
            ) : (
              <>
                <div className="project-manage-side-bar-title">页面</div>
                <div className="project-manage-side-bar-actions">
                  <SearchOutlined
                    className="project-manage-side-bar-action"
                    onClick={() => setIsSearchPage(true)}
                  />
                  <PlusOutlined
                    className="project-manage-side-bar-action"
                    onClick={() => {
                      setIsOpenEditPage(true)
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="project-manage-pages">
            {pageList.map((item) => (
              <div
                onClick={() => setCurrentElement(item)}
                className={`project-manage-page ${item.code === currentElement?.code ? 'project-manage-page-active' : ''}`}
                key={item.code}
              >
                <CheckOutlined className="project-manage-page-icon" />
                <p className="project-manage-page-text">{item.pageName}</p>
              </div>
            ))}
          </div>
        </div>

        <ProjectView
          ref={canvas}
          pageData={pageList}
          currentElement={currentElement}
          backgroundColor={currentBgColor}
          isLock={isCanvasLock}
          scale={scale}
          setScale={setScale}
          onContextMenu={handleContextMenu}
          onCloseContextMenu={() => setIsOpenContextMenu(false)}
          contextMenuVisible={isOpenContextMenu}
          setCurrentElement={setCurrentElement}
          setData={setPageList}
        />
      </div>

      {/*  右下固定栏  */}
      <div className="project-manage-fixed">
        <Space split={<Divider type="vertical" />}>
          <div style={{ display: 'flex' }}>
            <Space>
              {/*  修改背景颜色  */}
              <Tooltip placement="top" title="修改背景色">
                <div
                  className="project-manage-scale-btn"
                  onClick={() => setIsOpenChangeColor(!isOpenChangeColor)}
                >
                  <SettingOutlined />
                </div>
              </Tooltip>
              {/*  锁定或解锁  */}
              <Tooltip placement="top" title={isCanvasLock ? '解锁' : '锁定'}>
                <div
                  className="project-manage-scale-btn"
                  onClick={() => setIsCanvasLock((prevState) => !prevState)}
                >
                  {isCanvasLock}
                  {isCanvasLock ? <LockOutlined /> : <UnlockOutlined />}
                </div>
              </Tooltip>
            </Space>
          </div>

          <div className="project-manage-scale">
            <div
              className="project-manage-scale-btn"
              onClick={() => canvas.current?.scale(0.1, -1)}
            >
              <MinusOutlined />
            </div>
            <Dropdown
              placement="bottom"
              menu={{
                items: selectScales,
                style: { width: 200 },
                onClick: (e) => {
                  const item = selectScales?.find(
                    (item: any) => item.key === e.key
                  )
                  if (!item) return
                  const str = (item as any).label.props.children.slice(0, -1)
                  canvas.current?.scale(str / 100)
                }
              }}
            >
              <div className="project-manage-scale-dropdown">
                {(scale * 100).toFixed(0)}%
              </div>
            </Dropdown>
            <div
              className="project-manage-scale-btn"
              onClick={() => canvas.current?.scale(0.1, 1)}
            >
              <PlusOutlined />
            </div>
          </div>
        </Space>
      </div>

      {/*  修改背景色  */}
      {isOpenChangeColor && (
        <div className="project-manage-change-color">
          <p className="project-manage-change-color-title">修改背景色</p>
          <div className="project-manage-colors">
            {changeColors.map((item) => (
              <div
                key={item.bgColor}
                className={`project-manage-color ${item.bgColor === currentBgColor ? 'project-manage-color-active' : ''}`}
                style={{
                  backgroundColor: item.bgColor,
                  borderColor: item.borderColor
                }}
                onClick={() => setCurrentBgColor(item.bgColor)}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/*  重命名弹窗  */}
      <Modal
        title="页面名称"
        open={isRename}
        onOk={handleRenameOk}
        onCancel={handleCancelRename}
        okText="确定"
        cancelText="取消"
        afterOpenChange={(e) => {
          if (!e) return
          if (!renameRef.current) return
          renameRef.current.focus()
          renameRef.current.select()
        }}
      >
        <Form form={renameForm}>
          <Form.Item
            initialValue={rename}
            name="rename"
            rules={[{ required: true, message: '名称不能为空' }]}
          >
            <Input value={rename} placeholder="请输入名称" ref={renameRef} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="页面配置"
        open={isOpenEditPage}
        onOk={handleEditPage}
        onCancel={handleResetEditPage}
        okText="确定"
        cancelText="取消"
      >
        <Form form={pageConfigForm} initialValues={pageConfig}>
          <Form.Item
            label="页面名称"
            name="pageName"
            rules={[{ required: true, message: '名称不能为空' }]}
          >
            <Input placeholder="请输入页面名称" />
          </Form.Item>
          <Form.Item
            label="页面路由"
            name="pagePath"
            rules={[{ required: true, message: '路由不能为空' }]}
          >
            <Input placeholder="请输入页面路由地址" />
          </Form.Item>
        </Form>
      </Modal>

      {/*  右键菜单  */}
      {isOpenContextMenu && (
        <div
          className="project-manage-context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <div className="project-manage-context-menu-group">
            <p
              className="project-manage-context-menu-item"
              onClick={() => {
                if (!currentElement) return
                setIsRename(true)
                setRename(currentElement?.pageName)
                setIsOpenContextMenu(false)
              }}
            >
              重命名
            </p>
          </div>
          <Divider style={{ margin: '6px 0' }} />
          <div className="project-manage-context-menu-group">
            <p className="project-manage-context-menu-item">复制</p>
            <p className="project-manage-context-menu-item">粘贴</p>
          </div>
          <Divider style={{ margin: '6px 0' }} />
          <div className="project-manage-context-menu-group">
            <p
              className="project-manage-context-menu-item"
              style={{ color: '#ff2f4f' }}
            >
              删除
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default ProjectManage
