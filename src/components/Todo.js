import React, { useState,useEffect } from "react";
import "./Todo.css";

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    
    if (list)
    {
        return JSON.parse(list);    
    }
    else
    {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems);
    const [togglebtn, settogglebtn] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

  
    const addItem = () => {
        if (!inputData)
        {
            alert("Please Enter Data");
        }
        else if (!togglebtn && inputData)
        {
            setItems(
                items.map((ele) => {
                    if (ele.id === isEditItem)
                    {
                        return { ...ele,name: inputData };
                    }
                    
                    return ele;
                })
            )

            settogglebtn(true);
            setInputData("");
            setIsEditItem(null);
            }
        else {
            const allInputData = {
                id: new Date().getTime().toString(),
                name:inputData
            }

            setItems([...items, allInputData]);
            setInputData("");
        }
    }


    const editItem = (id) => {

        let newEditItem = items.find((ele) => {
            return ele.id === id;   
        })

        setInputData(newEditItem.name);
        settogglebtn(false);
        setIsEditItem(id);
 
    }

    const deleteItem = (id) => {
        const updatedList = items.filter((ele)=> {
            return ele.id !== id;
        })

        setItems(updatedList);
    }
     

    const removeAll = () => {
        setItems([]);
    }

 
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

 
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="Images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                         
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍Add Items..." value={inputData} onChange={(event) => setInputData(event.target.value)}></input>
                        
                        {
                            togglebtn?<i className="fa fa-plus add-btn" title="Add Item"  onClick={addItem}></i> : <i className="far fa-edit add-btn" title="Edit Item" onClick={addItem}></i>
                        }
                        

                    </div>

                    <div className="showItems">
                        {
                            items.map((currEle) => { 
                                return (
                                    <div className="eachItem" key={currEle.id}>
                                        <h3> {currEle.name}</h3>
                                        <div className="todo-btn">
                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(currEle.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(currEle.id)}></i>
                                        </div>
                                                    
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="showItems">
                        
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
                    </div>

                </div>






            </div>
        </>
    );
}

export default Todo;