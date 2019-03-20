import React, { Component } from 'react';

import {
  Container,
  Row,
  Jumbotron,
  InputGroupAddon,
  Button,  
  FormGroup,
  Input,
  Col
} from 'reactstrap';

class Pitanja extends Component {
   constructor(props) {
      super(props);
    
      this.state = {
         vrsteList: [],
         bazaVrste:[],
         novoPitanje: '',
         pitanjeSaId: null,
         pitanjaList: [],
         bazaPitanja: []
      };
    }
        
   getPitanjaList = () => {
      fetch('/api/pitanja')
      .then(res => res.json())
      .then(res => {      
         var bazaPitanja = res;
         this.setState({ bazaPitanja });
         var pitanjaList = res.map(r => r.pitanje);
         this.setState({ pitanjaList });      
      });
   };

   getPitanjeByTekst = () => {
      var pit = this.state.novoPitanje;
      fetch(`/api/pitanja/${pit}`)
      .then(res =>res.json())
      .then(pitanjeSaId => {
         console.log('resultat 2 je ' + pitanjeSaId.id_pitanja.value);      
         this.setState({ pitanjeSaId });
         console.log('2. potrebno');  
         console.log('1.GETPITANJE ' + this.state.pitanjeSaId.pitanje); 
         
      });
   };

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
//-----------------------------------------------------
   handleInputChange = (e) => {
      this.setState({ newCityName: e.target.value });
   }; 

   handleInputChangePitanje = (e) => {
      this.setState({ novoPitanje: e.target.value });
   };


   handleDodajPitanje = () => {
      console.log('1. potrebno'); 
      fetch('/api/pitanja', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ pitanje: this.state.novoPitanje })
      })
      .then(() => fetch(`/api/pitanja/${this.state.novoPitanje}`))
      .then(res => res.json())
      .then(res => {
         var pitanjeSaId = res[0];
         this.setState({ pitanjeSaId });
         this.setState({ novoPitanje: ''});    //brise tekst pitanja ,ali ima ceo slog u pitanjeSaId
         this.getPitanjaList(); 
         for (const checkbox of this.selectedCheckboxes) {
            this.handleDodajPV(this.state.pitanjeSaId.id_pitanja,checkbox);
         }      
      })   
   }

   handleDodajPV = (pitanje, vrsta) => {
      console.log(pitanje,vrsta);    
      fetch('/api/pv', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ pitanje: pitanje, vrsta: vrsta })
      })
   };
//-----------------------------------------------------
   componentDidMount () {
      this.getVrsteList();
      this.getPitanjaList();
      this.selectedCheckboxes = new Set();
      }

   // za checkboxes  ------------------------------------     
   toggleCheckbox = e => {
      var label = e.target.value;
      if (this.selectedCheckboxes.has(label)) {
         this.selectedCheckboxes.delete(label);
      } else {
         this.selectedCheckboxes.add(label);
      }
      console.log(this.selectedCheckboxes)
   }

   render() {
      const checkboxes =  this.state.bazaVrste.map((vrsta, i) => 
      <div  key={i}>
        <label>                     
            <Input type="checkbox" onClick={this.toggleCheckbox} name="radioRole" onChange={this.toggleRadio} value={vrsta.id_vrste} key={vrsta.id_vrste} style={{opacity:1}} />
              {vrsta.naziv_vrste}                       
        </label>
      </div>)
      return (
         <Container fluid className="centered">                 
            <Jumbotron>
               <Row>
                  <Col>   
                     <FormGroup>
                        <Input 
                           placeholder="Novo pitanje ..."
                           value={this.state.novoPitanje}
                           onChange={this.handleInputChangePitanje}
                        /><br/>                 
                        { checkboxes } 
                        <br/> 
                        <InputGroupAddon addonType="append">
                           <Button color="primary" onClick={this.handleDodajPitanje}>Dodaj pitanje</Button>
                        </InputGroupAddon>
                     </FormGroup>
                  </Col>
                  <Col>
                     <h1 className="display-5">Pitanja</h1>             
                     <FormGroup>
                        <Input type="select" onChange={this.handleChangeVrsta}>
                           { this.state.pitanjaList.length === 0 && <option>Nisu još dodata pitanja.</option> }
                           { this.state.pitanjaList.length > 0 && <option>Selektuj pitanje.</option> }
                           { this.state.pitanjaList.map((pitanje, i) => <option key={i}>{pitanje}</option>) }                 
                        </Input>             
                     </FormGroup>
                  </Col>
               </Row>
            </Jumbotron>   
         </Container>
      );
   }
}
export default Pitanja;