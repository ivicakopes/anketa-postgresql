import React, { Component } from 'react';

import {
  Container,
  Row,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Button,  
  FormGroup,
  Input,
  Col
} from 'reactstrap';
class Vrste extends Component {
  
   constructor(props) {
      super(props);
      
      this.state = {
         vrsteList: [],
         bazaVrste:[],
         novaVrstaNaziv: ''
      };
      }
         
   getVrsteList = () => {
   fetch('/api/vrste/bezAdmina')
   .then(res => res.json())    
   .then(res => {
      var bazaVrste = res;
      this.setState({ bazaVrste });
      var vrsteList = res.map(r => r.naziv_vrste);
      this.setState({ vrsteList });         
   });
   };

   handleInputChange = (e) => {
   this.setState({ newCityName: e.target.value });
   };

   handleInputChangeVrste = (e) => {
   this.setState({ novaVrstaNaziv: e.target.value });
   };     

   handleDodajVrstu = () => {
   fetch('/api/vrste', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vrste: this.state.novaVrstaNaziv })
   })
   .then(res => res.json())
   .then(res => {
      this.getVrsteList();
      this.setState({ novaVrstaNaziv: '' });
   });
   }; 

   componentDidMount () {
   this.getVrsteList();
   }     
   render() {
   return (
      <Container fluid className="centered">  
      <Jumbotron>
         <Row>
      <Col>
               <InputGroup>
               <Input 
                  placeholder="Nova vrsta korisnika..."
                  value={this.state.novaVrstaNaziv}
                  onChange={this.handleInputChangeVrste}
               />
               <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleDodajVrstu}>Dodaj novu vrstu korisnika</Button>
               </InputGroupAddon>                
               </InputGroup>
            </Col>
            <Col>
         <h1 className="display-5">Vrste korisnika</h1>
         <FormGroup>
            <Input type="select" onChange={this.handleChangeVrsta}>
               { this.state.vrsteList.length === 0 && <option>Nisu još dodate vrste.</option> }
               { this.state.vrsteList.length > 0 && <option>Selektuj vrstu.</option> }
               { this.state.vrsteList.map((vrsta, i) => <option key={i}>{vrsta}</option>) }                 
            </Input>             
         </FormGroup>
         
         </Col>
         </Row>
         </Jumbotron>        
         
         
      </Container>
   );
   }
}

export default Vrste;