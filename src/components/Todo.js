import React, { useState,useEffect } from "react";
import "./Todo.css";


const getLocalItems = () => {
    // For Getting Item from LocalStorage

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

  
    // For Adding Item in InputBox

    const addItem = () => {
        if (!inputData)
        {
            alert("Please Enter Data");
        }

        else if (!togglebtn && inputData)  
        {
            // For Edit Button when it is at Input Box
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
            
        else
        {
            // For Add Button 

            const allInputData = {
                id: new Date().getTime().toString(),
                name:inputData
            }

            setItems([...items, allInputData]);
            setInputData("");
        }
    }

    //  For Edit Button
    const editItem = (ele) => {

        setInputData(ele.name);
        settogglebtn(false);
        setIsEditItem(ele.id);
 
    }

    // For Delete Button
    const deleteItem = (id) => {
        const updatedList = items.filter((ele)=> {
            return ele.id !== id;
        })

        setItems(updatedList);
    }
     
    // For Deleting All items 
    const removeAll = () => {
        setItems([]);
    }

    // For Storing Values inside Local Storage when changes made to Items
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
                        {/*For Which Button should Show Add or Edit Button */}
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
                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(currEle)}></i>
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
