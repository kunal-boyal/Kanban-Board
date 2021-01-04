import React from 'react';
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';

import classes from './Task.module.css'

const Container = styled.div`
    border: 1px solid lightgray;
    border-bottom:3px solid lightgray;
    border-radius: 10px;
    margin-bottom: 8px;
    padding:8px;
    background:${props => (props.isDragging ? '#ffc20e' : 'white')};
    
`

const Task = (props) => {
    return (
        <React.Fragment>
            <Draggable key={props.task.id} draggableId={String(props.task.id)} index={props.index}>
                {(provided, snapshot) => (
                    <Container className={classes.container}
                        onClick={props.clicked}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                    >
                        {props.task.content}
                    </Container>
                )}
            </Draggable>
        </React.Fragment >
    )
}

export default Task