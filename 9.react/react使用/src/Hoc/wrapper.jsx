import React from 'react'

export default function wraper(OldComponent,name){
    class newComponent extends React.Component {
        constructor(){
            super();
            this.state = {
                data: ''
            }
            this.handleChange = this.handleChange.bind(this)
        }
        componentDidMount(){
            this.setState({data:localStorage.getItem(name)||''})
        }

        handleChange(event){
            localStorage.setItem(name,event.target.value)
            this.setState({data:event.target.value})
        }

        render(){
            return <OldComponent data={this.state.data} handleChange={this.handleChange}/>
        }
    }
    return newComponent
}