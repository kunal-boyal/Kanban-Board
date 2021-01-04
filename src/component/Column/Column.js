import React from 'react';
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TextareaAutosize from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import { connect } from 'react-redux'

import * as actions from '../../store/action/actions'
import Task from '../Task/Task'
import classes from './Column.module.css'
import Modal from '../Modal/Modal'

const TaskList = styled.div`
    padding:4px;
    transition: background-color 0.5s ease;
    background-color:${props => (props.isDraggingOver ? '#caccd1' : 'inherit')};
    flex-grow:1;
    min-height:100px
`

class Column extends React.Component {

    state = {
        formOpen: false,
        text: '',
        columnId: null,
        modalOpen: false,
        task: ''
    }

    openForm = (a) => {
        this.setState({ formOpen: true, columnId: a })
    }

    closeForm = () => {
        if (this.state.text.trim().length > 0) {
            let stateTasks = { ...this.props.stateTasks }
            let noOfCard = Object.keys(stateTasks).length
            stateTasks['task' + (noOfCard + 1)] = {
                id: `task${noOfCard + 1}`,
                content: this.state.text
            }

            let columns = { ...this.props.columns }
            columns[this.state.columnId].taskIds.push('task' + (noOfCard + 1))
            this.setState({ text: '' })
            this.props.onAddCard({ columns: columns, tasks: stateTasks })
            this.setState({ formOpen: false })
        }
        else {
            this.setState({ formOpen: false })
        }
    };

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value,
        });
    };

    modalOpen = (value, task) => {
        this.setState({ modalOpen: value, task: task })
    }

    render() {
        const addCardConfirm =
            <div>
                <Card
                    style={{
                        padding: 4,
                        minHeight: 60,
                    }}>
                    <TextareaAutosize
                        placeholder="Enter the title for this card..."
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
                <Button onClick={this.closeForm} style={{ height: '40px', width: '200px', marginTop: '8px' }} variant="contained" color="primary" >Add Card</Button>
            </div>

        return (
            <React.Fragment>
                < Draggable draggableId={this.props.column.id} index={this.props.index} >
                    {(provided) => (
                        <div className={classes.Container}
                            ref={provided.innerRef}
                            {...provided.draggableProps}>
                            <h3 className={classes.Title} {...provided.dragHandleProps}>{this.props.column.title}</h3>
                            <Droppable droppableId={this.props.column.id.toString()} type="task">
                                {(provided, snapshot) => (
                                    <TaskList
                                        {...provided.droppableProps}
                                        ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                                        {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} clicked={() => this.modalOpen(true, task.content)} />)}
                                        {provided.placeholder}
                                        {!this.state.formOpen
                                            ? <Button onClick={() => this.openForm(this.props.column.id)} variant="contained" color="primary" startIcon={<AddIcon />}>
                                                Add Card
                                        </Button>
                                            : addCardConfirm
                                        }
                                    </TaskList>
                                )}
                            </Droppable>
                        </div>
                    )}
                </Draggable >
                <Modal show={this.state.modalOpen} task={this.state.task} onHide={() => this.modalOpen(false)} />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        stateTasks: state.tasks,
        columns: state.columns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddCard: (data) => dispatch(actions.addCard(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)
