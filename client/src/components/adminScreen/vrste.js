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
         novaVrstaNaziv: '',
         selectedVrsta: null
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

   handleChangeVrsta = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedVrsta = this.state.bazaVrste.filter(vrsta => vrsta.id_vrste == id[0])[0]; 
      this.setState({ selectedVrsta })      
   }

   componentDidMount () {
      this.getVrsteList();
   }

   render() {
      let selectedObject;
      if (this.state.selectedVrsta) {
         selectedObject = <div className="red center"> {this.state.selectedVrsta.naziv_vrste}</div>;
      };

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
                           { this.state.bazaVrste.map((vrsta, i) => <option key={i} id={vrsta.id_vrste}>{vrsta.id_vrste}. {vrsta.naziv_vrste}</option>) }                 
                        </Input>             
                     </FormGroup>            
                  </Col>
               </Row>
            </Jumbotron>        
            <Jumbotron>
               {selectedObject}
            </Jumbotron>          
         </Container>
      );
   }
}

export default Vrste;