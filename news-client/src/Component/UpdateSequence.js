import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadData } from "../services/Data";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function UpdateSequence() {
  const [contents, setContents] = useState(null);
  const id = useParams();

  useEffect(() => {
    loadData("newscontents/" + id.id).then((res) => {
      setContents(res.data);
    });
  },[]);
 
  const onDragEnd = (result) => {
    // const { destination, source, draggableId } = result;
    // if (!destination) {
    //   return;
    // }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
    // const newsOrder =contents; 
    // newsOrder.map((item) => {
    //     const index = Array.from(item).indexOf(draggableId);
    //     console.log(index);
    // })   
    // console.log(draggableId);
    // const remove = newsOrder.splice(source.index, 1);
    // //newsOrder.splice(destination.index,0,remove);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <Droppable droppableId={id.id}>
          {(provided) => (
            <Grid
              container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {contents &&
                contents.map((item) => {
                    console.log(item);
                  return (
                    <Draggable
                      draggableId={item.content}
                      index={item.contentId}
                    >
                      {(provided, snapshot) => (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          data-id={item.sequence}
                        >
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card
                              sx={{
                                width: 400,
                                height: 375,
                                padding: "10px",
                                margin: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                              }}
                              key={item.contentId}
                              variant="outlined"
                            >
                              <CardContent>
                                <Typography variant="h5" component="div">
                                  Sequence : {item.sequence}
                                </Typography>
                                {item.contentType === "txt" ? (
                                  <Typography sx={{ mb: 1.5 }}>
                                    {item.content}
                                  </Typography>
                                ) : (
                                  <img
                                    src={
                                      "http://localhost:13715/Images/" +
                                      item.content
                                    }
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </Grid>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default UpdateSequence;
