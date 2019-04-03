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
         bazaVrste:[],
         novoPitanje: '',
         pitanjeSaId: null,
         pitanjaList: [],
         bazaPitanja: [],
         selectedPitanje: null
      };
    }
        
   getPitanjaList = () => {
      fetch('/api/pitanja')
      .then(res => res.json())
      .then(res => this.setState({ bazaPitanja: res }))
   }

   getPitanjeByTekst = () => {
      var pit = this.state.novoPitanje;
      fetch(`/api/pitanja/${pit}`)
      .then(res =>res.json())
      .then(pitanjeSaId => {   
         this.setState({ pitanjeSaId })         
      });
   }

   getVrsteList = () => {
      fetch('/api/vrste/bezAdmina')
      .then(res => res.json())    
      .then(res => this.setState({ bazaVrste: res }))
   };
//-----------------------------------------------------
   handleInputChange = (e) => {
      this.setState({ newCityName: e.target.value });
   }; 

   handleInputChangePitanje = (e) => {
      this.setState({ novoPitanje: e.target.value });
   };

   handleDodajPitanje = () => {
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
            this.handleDodajPV(this.state.pitanjeSaId.id_pitanja, checkbox);
         }      
      })   
   }

   handleDodajPV = (pitanje, vrsta) => {
      fetch('/api/pv', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ pitanje: pitanje, vrsta: vrsta })
      })
   };

   handleChangePitanja = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedPitanje = this.state.bazaPitanja.filter(pitanje => pitanje.id_pitanja == id[0])[0];     
      this.setState({ selectedPitanje })      
   }
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
   }

   render() {
      const checkboxes =  this.state.bazaVrste.map((vrsta, i) => 
      <div  key={i}>
        <label style={{marginLeft:20 +'px'}}>                     
            <Input type="checkbox" onClick={this.toggleCheckbox} name="radioRole" onChange={this.toggleRadio} value={vrsta.id_vrste} key={vrsta.id_vrste} style={{opacity:1}} />
              {vrsta.naziv_vrste}                       
        </label>
      </div>)

      let selectedObject;
      if (this.state.selectedPitanje) {
         selectedObject = <div className="red center"> {this.state.selectedPitanje.pitanje}</div>;
      };

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
                        <Input type="select" onChange={this.handleChangePitanja}>
                           { this.state.bazaPitanja.length === 0 && <option>Nisu još dodata pitanja.</option> }
                           { this.state.bazaPitanja.length > 0 && <option>Selektuj pitanje.</option> }
                           { this.state.bazaPitanja.map((pitanje, i) => <option key={i} id={pitanje.id_pitanja}>{pitanje.id_pitanja}. {pitanje.pitanje}</option>) }                 
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
export default Pitanja;