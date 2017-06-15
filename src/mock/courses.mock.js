export const theadData = [
    {
        id: 'course_name',
        text: '课程名称'
    },
    {
        id: 'tutor_id',
        text: '讲师'
    },
    {
        id: 'category_name',
        text: '类型'
    },
    {
        id: 'operator',
        text: '操作'
    }
]

export const AllCourseTypes = {
    children: [
        {
            class_id: '1',
            class_name: '一大类',
            children: [
                {
                    category_id: '1',
                    category_name: '一大类一分类'
                },
                {
                    category_id: '2',
                    category_name: '一大类二分类'
                }
            ]
        },
        {
            class_id: '2',
            class_name: '二大类',
            children: [
                {
                    category_id: '1',
                    category_name: '二大类一分类'
                },
                {
                    category_id: '2',
                    category_name: '二大类二分类'
                }
            ]
        }
    ]
}

export const OperateList = [
    {text: '下架', type: 'soldOut', disabled: true},
    {text: '编辑', type: 'edit', disabled: false},
    {text: '删除', type: 'delete', disabled: false}
]

