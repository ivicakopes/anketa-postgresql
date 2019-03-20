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

class Ankete extends Component {
   constructor(props) {
      super(props);
    
      this.state = {
         vrsteList: [],
         bazaVrste:[],
         novoPitanje: '',
         pitanjeSaId: null,
         pitanjaList: [],
         bazaPitanja: [],
         anketaSaId: null,
         anketeList: [],
         bazaAnketa: [],
         selectedAnketa: null
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

   getAnketeList = () => {
      fetch('/api/ankete')
      .then(res => res.json())
      .then(res => {      
         var bazaAnketa = res;
         this.setState({ bazaAnketa });
         var anketeList = res.map(r => r.naziv_ankete);
         this.setState({ anketeList });      
      });
   };

   getPitanjeByTekst = () => {
      var pit = this.state.novoPitanje;
      fetch(`/api/pitanja/${pit}`)
      .then(res =>res.json())
      .then(pitanjeSaId => this.setState({ pitanjeSaId }))
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

   handleChangeAnketa = (e) => {
      var id= e.target.value.split(".");
      console.log(id[0]);
      var selectedAnketa = this.state.bazaAnketa.filter(anketa => anketa.id_ankete === id[0])[0];     
      this.setState({ selectedAnketa })      
   }
//-----------------------------------------------------
   componentDidMount () {
      this.getVrsteList();
      this.getAnketeList();
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
      </div>);

      let blabla;
      if (this.state.selectedAnketa) {
         blabla = <div className="red center"> {this.state.selectedAnketa.naziv_ankete}</div>;
       };
      return (
         <Container fluid className="centered">                 
            <Jumbotron>
               <Row>
                  <Col>   
                     <FormGroup>
                        <Input 
                           placeholder="Nova anketa ..."
                           value={this.state.novoPitanje}
                           onChange={this.handleInputChangePitanje}
                        /><br/>                 
                        { checkboxes } 
                        <br/> 
                        <InputGroupAddon addonType="append">
                           <Button color="primary" onClick={this.handleDodajPitanje}>Dodaj anketu</Button>
                        </InputGroupAddon>
                     </FormGroup>
                  </Col>
                  <Col>
                     <h1 className="display-5">Ankete</h1>             
                     <FormGroup>
                        <Input type="select" onChange={this.handleChangeAnketa}>
                           { this.state.pitanjaList.length === 0 && <option>Nisu još dodate ankete</option> }
                           { this.state.pitanjaList.length > 0 && <option>Selektuj anketu</option> }
                           { this.state.bazaAnketa.map((anketa, i) => <option key={i} id={anketa.id_ankete}>{anketa.id_ankete}. {anketa.naziv_ankete}</option>) }                 
                        </Input>             
                     </FormGroup>
                  </Col>
               </Row>
            </Jumbotron> 
            <Jumbotron>
               {blabla}
            </Jumbotron>

         </Container>
      );
   }
}
export default Ankete;