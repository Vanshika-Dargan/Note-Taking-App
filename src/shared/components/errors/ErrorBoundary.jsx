import React from 'react';
export class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);// props init
        this.state = {error: null};
    }
    static getDerivedStateFromError(error){
        return {error:error};
    }
    componentDidCatch(error , info){
        console.log('Error Pick ', error);
        //this.setState(error);
        console.log('Error Comes ', error);
    }

    render(){
        if(this.state.error){
            return (<p>OOPS Something Went Wrong...</p>)
        }
        else{
            return this.props.children;
        }
    }
}