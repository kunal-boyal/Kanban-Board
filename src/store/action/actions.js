import * as actionTypes from './actionTypes';


export const dragColumn = (data) => {
    return {
        type: actionTypes.DRAG_COLUMN,
        columnOrder: data
    }
}

export const taskIndexChange = (data) => {
    return {
        type: actionTypes.TASK_INDEX_CHANGE,
        columns:data
    }
}


export const taskColumnChange = (data) => {
    return {
        type: actionTypes.TASK_COLUMN_CHANGE,
        columns:data
    }
}

export const addColumn = (data) => {
    return {
        type: actionTypes.ADD_COLUMN,
        columns: data.columns,
        columnOrder: data.columnOrder
    }
}

export const addCard = (data) => {
    return {
        type: actionTypes.ADD_CARD,
        columns: data.columns,
        tasks:data.tasks
    }
}



