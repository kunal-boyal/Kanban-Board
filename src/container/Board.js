import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TextareaAutosize from "react-textarea-autosize";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import { connect } from 'react-redux'

import Column from '../component/Column/Column'
import * as actions from '../store/action/actions'
// import Modal from '../component/Modal/Modal'

class Board extends Component {

    state = {
        formOpen: false,
        text: ""
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result
        if (!destination) return

        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === 'column') {
            const newColumnOrder = Array.from(this.props.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)
            this.props.onDragColumn(newColumnOrder)
            return
        }

        const start = this.props.columns[source.droppableId];
        const finish = this.props.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            let columns = {
                    ...this.props.columns,
                    [newColumn.id]: newColumn
            }
            this.props.onTaskIndexChange(columns)
            return
        }

        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishedTaskIds = Array.from(finish.taskIds)
        finishedTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishedTaskIds
        }
        const newState = {
            ...this.props.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
        }
        this.props.onTaskColumnChange(newState)
    }

    openForm = () => {
        this.setState({ formOpen: true })
    }

    closeForm = () => {
        if (this.state.text.trim().length > 0) {
            let columns = { ...this.props.columns }
            let noOfList = Object.keys(columns).length
            columns['column' + (noOfList + 1)] = {
                id: `column${noOfList + 1}`,
                title: this.state.text,
                taskIds: []
            }
        
            let columnOrder = [...this.props.columnOrder]
            columnOrder.push('column' + (noOfList + 1))
            this.setState({text:''})
            this.props.onAddColumn({ columns: columns, columnOrder: columnOrder })
            this.setState({ formOpen: false })
        }
        else {
            this.setState({ formOpen: false })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value,
        });
    };


    render() {

        const column = this.props.columnOrder.map((columnId, index) => {
            const column = this.props.columns[columnId]
            const tasks = column.taskIds.map(taskId => this.props.tasks[taskId])
            return <Column key={column.id} tasks={tasks} column={column} index={index} />
        })

        const addAnotherListButton = <Button onClick={this.openForm} style={{ height: '40px', width: '200px', marginTop: '8px' }} variant="contained" color="primary" startIcon={<AddIcon />}>Add another list</Button>

        const addListConfirm =
            <div>
                <Card
                    style={{
                        width: 220,
                        margin: 8,
                        minHeight:100,
                        padding: "6px 8px 2px",
                    }}>
                    <TextareaAutosize
                        placeholder="Enter the title for this list..."
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none",
                        }}
                    />
                </Card>
                <Button onClick={this.closeForm} style={{ height: '40px', width: '200px', marginTop: '8px' }} variant="contained" color="primary" >Add list</Button>
            </div>

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="allColumns" direction="horizontal" type="column">
                    {(provided) => (
                        <div style={{ display: `flex` }}
                            {...provided.droppableProps}
                            ref={provided.innerRef} >
                            {column}
                            {provided.placeholder}
                            {!this.state.formOpen ? addAnotherListButton : addListConfirm}
                        </div>
                        
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        columns: state.columns,
        columnOrder: state.columnOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDragColumn: (data) => dispatch(actions.dragColumn(data)),
        onTaskIndexChange: (data) => dispatch(actions.taskIndexChange(data)),
        onTaskColumnChange: (data) => dispatch(actions.taskColumnChange(data)),
        onAddColumn: (data) => dispatch(actions.addColumn(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)