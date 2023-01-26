import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useReducer } from "react";


function Home() {
    function reducer(state, action) {
        switch (action.type) {
            case "Add":
                let actionSkill = action.skill;
                return [...state, actionSkill];
            case "Remove":
                let newState = [...state];
                newState.splice(action.index, 1);
                return newState;
            default:
                console.log("Incorrect Type.");
        }
    }
    const [info, setInfo] = useState({ name: "" });
    const [exp, setExp] = useState({ name: "", position: "", description: "", skill: "" });
    const [contact, setContact] = useState({ email: "", phone: "", skype: "" });
    const [skills, dispatch] = useReducer(reducer, []);

    const [newSkill, setNewSkill] = useState("");

    function onChange(e) {
        setNewSkill(e.target.value);
    }
    function onFormChange(e) {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    function addSkill() {
        dispatch({ type: "Add", skill: newSkill });
        setNewSkill("");
    }
    function onExpChange(e) {
        setExp({ ...exp, [e.target.name]: e.target.value });
    }
    function onContactChange(e) {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ name: info, exp: exp, skill: { exp: 10, skills: skills }, contact : contact });
        // const response = await fetch("http://localhost:5000", {
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json"
        //     },
        //     body : JSON.stringify()
        // })

        // const json = await response.json();

        // console.log(json);
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} className="container border p-4 mt-5 w-25">
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="name" value={info.name} onChange={onFormChange} placeholder="Full Name" />
                </Form.Group>
                <Form.Group className="mb-3 border  p-2">
                    <h4>Experience : </h4>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={onExpChange} value={exp.name} placeholder="Company name" />
                    <Form.Label className="mt-1">Position</Form.Label>
                    <Form.Control type="text" name="position" onChange={onExpChange} value={exp.position} placeholder="Position" />
                    <Form.Label className="mt-1">Job Description</Form.Label>
                    <textarea type="text" name="description" onChange={onExpChange} value={exp.description} cols="50" rows="3"></textarea>
                    <Form.Label className="mt-1">Skill Used</Form.Label>
                    <Form.Control type="text" name="skill" onChange={onExpChange} value={exp.skill} placeholder="Skill Used" />
                </Form.Group>
                <Form.Group className="mb-3 border  p-2">
                    <div>
                        <h4>Skills :</h4>
                        <ul>{skills.map((skill, index) => {
                            return (
                                <div key={index} className="mt-1">
                                    <li className="btn btn-outline-warning text-black">{skill + "   "}<button type="button" className="btn btn-danger btn-sm" onClick={() => { dispatch({ type: "Remove", index: index }) }}>X</button></li>
                                </div>
                            )
                        })}</ul>
                    </div>
                    <div>
                        <input type="text" name="skill" value={newSkill} onChange={onChange}></input>
                        <button type="button" className="btn btn-success btn-sm mx-1" onClick={addSkill} >Add Skill</button>
                    </div>
                    <Form.Label className="mt-1">No. of Experience</Form.Label>
                    <Form.Control type="number" style={{ maxWidth: "100px" }} />
                </Form.Group>
                <Form.Group className="mb-3 border  p-2">
                    <h4>Contact : </h4>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={onContactChange} value={contact.email} placeholder="Enter email" />
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" onChange={onContactChange} value={contact.phone} placeholder="Enter phone number" />
                    <Form.Label>Skype Id</Form.Label>
                    <Form.Control type="text" name="skype" onChange={onContactChange} value={contact.skype} placeholder="Enter Skype Id" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}


export default Home;