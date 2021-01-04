import * as actionTypes from '../action/actionTypes'

const initialState = {
    tasks: {
        task1: { id: 'task1', content: 'Take out the garbage', description: '' },
        task2: { id: 'task2', content: 'Charge the phone', description: '' },
        task3: { id: 'task3', content: 'Make Dinner', description: '' },
        task4: { id: 'task4', content: 'Watch fav movie', description: '' }
    },
    columns: {
        column1: {
            id: "column1",
            title: 'To Do',
            taskIds: ['task1', 'task2', 'task3', 'task4']
        },
        column2: {
            id: "column2",
            title: 'In Progress',
            taskIds: []
        },
        column3: {
            id: "column3",
            title: 'Done',
            taskIds: []
        }
    },
    columnOrder: ["column1", "column2", "column3"]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.DRAG_COLUMN):
            return {
                ...state,
                columnOrder: action.columnOrder
            }
        case (actionTypes.TASK_INDEX_CHANGE):
            return {
                ...state,
                columns: action.columns
            }
        case (actionTypes.TASK_COLUMN_CHANGE):
            return {
                ...state,
                columns: action.columns
            }
        case (actionTypes.ADD_COLUMN):
            return {
                ...state,
                columns: action.columns,
                columnOrder: action.columnOrder
            }
        case (actionTypes.ADD_CARD):
            return {
                ...state,
                columns: action.columns,
                tasks: action.tasks
            }
        default:
            return state
    }
}

export default reducer