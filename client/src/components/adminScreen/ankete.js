import React, { Component } from 'react';

import {
  Container,
  Row,
  Jumbotron,
  FormGroup,
  Input,
  Col
} from 'reactstrap';

class Ankete extends Component {
   constructor(props) {
      super(props);
    
      this.state = {
         bazaVrste:[],
         bazaPitanja: [],
         pitanjaUAnketi: [],
         anketaSaId: null,
         bazaAnketa: [],
         selectedAnketa: null,
         noviNazivAnkete: null,
         noviDatumPočetka: null,
         noviDatumZavršetka: null,
         roleSelected: 1
      };
      this.getPitanjaListPoAnketi=this.getPitanjaListPoAnketi.bind(this);
      this.getPitanjaListPoVrsti=this.getPitanjaListPoVrsti.bind(this);
    }
        
   getPitanjaListPoVrsti(vrsta){
      fetch(`/api/pitanja/vrsta/${vrsta}`)
      .then(res => res.json())
      .then(res => {    
         var bazaPitanja = res;
         this.setState({ 
            bazaPitanja,           
            pitanjaUAnketi: []
          })
      })
   };

   getPitanjaListPoAnketi(anketa){
      fetch(`/api/pitanja/anketa/${anketa}`)
      .then(res => res.json())
      .then(res => this.setState({ bazaPitanjaAnketa :res }))
   }

   getAnketeList = () => {
      fetch('/api/ankete')
      .then(res => res.json())
      .then(res => this.setState({ bazaAnketa: res }))
   }
   
   getVrsteList = () => {
      fetch('/api/vrste/bezAdmina')
      .then(res => res.json())    
      .then(res => this.setState({ bazaVrste: res }))
   };

   handleInputChangeNazivAnkete = (e) => {
      this.setState({ noviNazivAnkete: e.target.value });
   };

   handleInputChangeDatumPočetka = (e) => {
      this.setState({ noviDatumPočetka: e.target.value });
   };

   handleInputChangeDatumZavršetka = (e) => {
      this.setState({ noviDatumZavršetka: e.target.value });
   };

   handleDodajAnketu = () => {
      fetch('/api/ankete', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
            naziv_ankete: this.state.noviNazivAnkete,
            datum: "[" + this.state.noviDatumPočetka + "," + this.state.noviDatumZavršetka + ")",
            vrsta_ankete: this.state.roleSelected
          })
      })      
   }

   handleChangeAnketa = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedAnketa = this.state.bazaAnketa.filter(anketa => anketa.id_ankete == id[0])[0]; 
      this.setState({ selectedAnketa });
      if(selectedAnketa){
         fetch(`/api/pitanja/anketa/${selectedAnketa.id_ankete}`)
         .then(res => res.json())
         .then(res => this.setState({ pitanjaUAnketi: res })) 
         .then(() => {
            fetch(`/api/pitanja/vrsta/${selectedAnketa.vrsta_ankete}`)
            .then(res => res.json())
            .then(res => this.setState({ bazaPitanja: res })) 
            .then(() => {
               const bazaPitanja = this.state.bazaPitanja.filter(item => {
                  var ppp = this.state.pitanjaUAnketi.filter(pitanje => {
                     // eslint-disable-next-line
                     return pitanje.id_pitanja == item.id_pitanja
                  }) 
                  if (ppp[0]){
                     return false;
                  }
                  else{
                     return true
                  }                    
               })                         
               this.setState({ bazaPitanja })        
            }) 
         })
      }       
   }   

   toggleRadio (){}

   handleRadio = (e) => {
      var roleSelected = e.target.value;
      if(roleSelected !== undefined) 
         this.setState ({ roleSelected })
   } 
   
   handleUbaciPitanjeUAnketu(i){
      var newArrAnketa = this.state.pitanjaUAnketi;
      var newArrBaza = this.state.bazaPitanja;
      newArrAnketa.push(this.state.bazaPitanja[i]);
      newArrBaza.splice(i,1);
      this.setState({
         pitanjaUAnketi: newArrAnketa,
         bazaPitanja: newArrBaza
      });
   } 

   handleIzbaciPitanjeIzAnkete(i){
      var newArrAnketa = this.state.pitanjaUAnketi;
      var newArrBaza = this.state.bazaPitanja;
      newArrBaza.push(this.state.pitanjaUAnketi[i]);
      newArrAnketa.splice(i,1);
      this.setState({
         pitanjaUAnketi: newArrAnketa,
         bazaPitanja: newArrBaza
      });
   } 

   handleSnimiAnketuSaPitanjima = () => {
      for (const pitanje of this.state.pitanjaUAnketi){
         this.snimiAPV( this.state.selectedAnketa.id_ankete, pitanje.id_pitanja)
      }  
   }

   snimiAPV(anketa, pitanje){
      fetch(`/api/apv/${anketa}/${pitanje}`)
      .then(res =>res.json())
      .then(res => {
         if(!res[0]){
            fetch('/api/apv', {
               method: 'post',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ 
                  anketa: anketa,
                  pitanje: pitanje
                })
            }) 
         }
      })   
   }

   componentDidMount () {
      this.getVrsteList();
      this.getAnketeList();
   }  

   render() {
      const radio =  this.state.bazaVrste.map((vrsta, i) => 
      <div  key={i}>
        <label onClick={this.handleRadio} value="vrsta.id_vrste" style={{marginLeft:20 +'px'}}>                     
            <Input type="radio" name="radioRole" onChange={this.toggleRadio} value={vrsta.id_vrste} key={vrsta.id_vrste} style={{opacity:1}} />
              {vrsta.naziv_vrste}                       
        </label>
      </div>);

      let selectedObject;
      if (this.state.selectedAnketa) {
         var datumi = this.state.selectedAnketa.datum.substr(1,21).split(',');
         
         var pitanja = this.state.bazaPitanja.map((pitanja, i) => 
            <div className="yellow" style={{margin:10 +'px'}} key={i}>
               {pitanja.id_pitanja}. {pitanja.pitanje}
               <button className="btn-primary  right" style={{padding:0 + "," + 0 }} id={pitanja.id_pitanja} onClick={()=>this.handleUbaciPitanjeUAnketu(i)}>+</button>
            </div>);
         
         var pitanjaUanketi = this.state.pitanjaUAnketi.map((pitanja, i) => 
           <div className="yellow" key={i} style={{margin:15 +'px'}}>
              {pitanja.id_pitanja}. {pitanja.pitanje}
              <button className="btn-primary  right" style={{padding:0 + "," + 0}} id={pitanja.id_pitanja} onClick={()=>this.handleIzbaciPitanjeIzAnkete(i)}>-</button>
           </div>); 
         
         var dugmeSubmit;
         
         if (this.state.pitanjaUAnketi.length > 0){
            dugmeSubmit = 
            <div>
               <button className="btn-primary " style={{padding:0 + "," + 0}}  onClick={this.handleSnimiAnketuSaPitanjima}>snimi anketu</button>
          </div>
         }
         selectedObject = 
            <div>
               <div className="red center"> {this.state.selectedAnketa.naziv_ankete} ---> {this.state.bazaVrste[this.state.selectedAnketa.vrsta_ankete-1].naziv_vrste}
            </div><br/>         
            <div className="blue center">
               {datumi[0]} do {datumi[1]}
            </div><br/>
            <Row>
               <Col>
                  <div>
                     moguća pitanja  
                  </div>
                  <div>
                     {pitanja}  
                  </div>    
               </Col>
               <Col>
                  <div>
                     pitanja u anketi
                  </div>
                  <div>
                     {pitanjaUanketi}  
                  </div> 
                  {dugmeSubmit}

               </Col>
            </Row>
                      
         </div>; 
       };

      return (
         <Container fluid className="centered">                 
            <Jumbotron>
               <Row>
                  <Col>
                     <form onSubmit={this.handleDodajAnketu}  style={{padding : 20 }}>
                        <FormGroup>
                           <Input 
                              placeholder="Nova anketa ..."
                              value={this.state.novoPitanje}
                              onChange={this.handleInputChangeNazivAnkete}
                              required
                           /><br/> 
                           
                           <Input 
                              placeholder="Datum početka ( yyyy-mm-dd ) ..."
                              value={this.state.novoPitanje}
                              onChange={this.handleInputChangeDatumPočetka}
                              required
                           />  
                           <Input 
                              placeholder="Datum završetka ( yyyy-mm-dd ) ..."
                              value={this.state.novoPitanje}
                              onChange={this.handleInputChangeDatumZavršetka}
                              required
                           />                
                           { radio }  
                        </FormGroup>
                        <div className="input-field">
                           <button className="btn btn-primary z-depth-0">dodaj</button>
                        </div> 
                     </form>                     
                  </Col>
                  <Col>
                     <h1 className="display-5">Ankete</h1>             
                     <FormGroup>
                        <Input type="select" onChange={this.handleChangeAnketa}>
                           { this.state.bazaAnketa.length === 0 && <option>Nisu još dodate ankete</option> }
                           { this.state.bazaAnketa.length > 0 && <option>Selektuj anketu</option> }
                           { this.state.bazaAnketa.map((anketa, i) => <option key={i} id={anketa.id_ankete}>{anketa.id_ankete}. {anketa.naziv_ankete}</option>) }                 
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
export default Ankete;