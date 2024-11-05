import React from 'react';
import './create-project.css';

function CreateProject(projCount){
    console.log(projCount);
    return (
        <div className="bgContain">
            <form className='popupBox'>
                <h1>New Project</h1>
                <div className='labelInput'>
                    <label className='labelField'>Project Name: </label>
                    <input type='text' placeholder={'New Project #'+projCount}></input>
                </div>
                <div className='labelInput'>
                    <label className='labelField'>Website<highlight>*</highlight>: </label>
                    <input type='text'></input>
                </div>
                <div>
                    <h2>Visibility</h2>
                    <div className='labelInput'>
                        <input type="radio" class="visibility" id="public" name="visib"/>
                        <label for="public"></label>
                        <input type="radio" class="visibility" id="private" name="visib"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateProject;