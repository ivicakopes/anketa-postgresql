import React, { Component } from 'react';

import {
  Container,
  Row, 
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
         bazaPitanja: [],
         pitanjaUAnketi: [],
         anketaSaId: null,
         anketeList: [],
         bazaAnketa: [],
         selectedAnketa: null,
         noviNazivAnkete: null,
         noviDatumPočetka: null,
         noviDatumZavršetka: null,
         roleSelected: 1
      };
     // this.getPitanjaListPoAnketi=this.getPitanjaListPoAnketi.bind(this);
     // this.getPitanjaListPoVrsti=this.getPitanjaListPoVrsti.bind(this);
      //this.handleChangeAnketa = this.handleChangeAnketa.bind(this);
    }
        
   getPitanjaListPoVrsti(vrsta){
      fetch(`/api/pitanja/vrsta/${vrsta}`)
      .then(res => res.json())
      .then(res => {    
         var bazaPitanja = res;
         var pitanjaList = res.map(r => r.pitanje);
         console.log("pitanjaList");
         console.log("baza");
         console.log(bazaPitanja);
         this.setState({ 
            bazaPitanja,
            pitanjaList,
            pitanjaUAnketi: []
          })
      })
      return
   };

   getPitanjaListPoAnketi(anketa){
      fetch(`/api/pitanja/anketa/${anketa}`)
      .then(res => res.json())
      .then(res => {    
         var bazaPitanjaAnketa = res;
         console.log("anketa");
         console.log(bazaPitanjaAnketa);
         this.setState({ 
            bazaPitanjaAnketa,
          })
      })
      return
   }

   getAnketeList = () => {
      fetch('/api/ankete')
      .then(res => res.json())
      .then(res => {      
         var bazaAnketa = res;
         this.setState({ bazaAnketa });
         var anketeList = res.map(r => r.naziv_ankete);
         this.setState({ anketeList });      
      })
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

   handleChangeAnketa = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedAnketa = this.state.bazaAnketa.filter(anketa => anketa.id_ankete == id[0])[0]; 
      this.setState({ selectedAnketa });
      if(selectedAnketa){
      console.log("1.change anketa to  " + selectedAnketa.id_ankete);
      fetch(`/api/pitanja/anketa/${selectedAnketa.id_ankete}`)
         .then(res => res.json())
         .then(res => {    
            var pitanjaUAnketi = res;
            console.log("anketa");
            console.log(pitanjaUAnketi);
            this.setState({ 
               pitanjaUAnketi,
            })
         }) 
         .then(() => {
            fetch(`/api/pitanja/vrsta/${selectedAnketa.vrsta_ankete}`)
               .then(res => res.json())
               .then(res => {    
                  var bazaPitanja = res;
                  console.log("baza");
                  console.log(bazaPitanja);
                  this.setState({ 
                     bazaPitanja
                  })   
               }) 
               .then(() => {
                  console.log("2.change anketa to  " + selectedAnketa.id_ankete);  
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
                  this.setState({
                     bazaPitanja
                  })        
      }) 
    })
   }       
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

      let selectedObject;
      if (this.state.selectedAnketa) {
         var datumi = this.state.selectedAnketa.datum.substr(1,21).split(',');
         
         var pitanja = this.state.bazaPitanja.map((pitanja, i) => 
            <div className="yellow" style={{margin:10 +'px'}} key={i}>
               {pitanja.id_pitanja}. {pitanja.pitanje}
               <button className="btn-primary  right" style={{padding:0 + "," + 0 }} id={pitanja.id_pitanja} onClick={()=>this.handleUbaciPitanjeUAnketu(i)}>+</button>
            </div>);
        // console.log(this.state.pitanjaUAnketi);
         var pitanjaUanketi = this.state.pitanjaUAnketi.map((pitanja, i) => 
           <div className="yellow" key={i} style={{margin:15 +'px'}}>
              {pitanja.id_pitanja}. {pitanja.pitanje}
              <button className="btn-primary  right" style={{padding:0 + "," + 0}} id={pitanja.id_pitanja} onClick={()=>this.handleIzbaciPitanjeIzAnkete(i)}>-</button>
           </div>); 
         
         var dugmeSubmit;
         
         if (this.state.pitanjaUAnketi.length > 0){
            dugmeSubmit = 
            <div>
               <button className="btn-primary " style={{padding:0 + "," + 0}}  onClick={() => this.handleSnimiAnketuSaPitanjima}>snimi anketu</button>
          </div>
         }
         selectedObject = 
            <div>
               <div className="red center"> {this.state.selectedAnketa.naziv_ankete} ---> {this.state.bazaVrste[this.state.selectedAnketa.vrsta_ankete-1].naziv_vrste}
            </div><br/>         
            <div className="blue center">{datumi[0]} do {datumi[1]}</div><br/>
            <Row>
               <Col><div>moguća pitanja</div> <div>{pitanja} </div> </Col>
               <Col><div>pitanja u anketi</div><div> {pitanjaUanketi} </div>{dugmeSubmit}</Col>
            </Row>                      
         </div>; 
       };

      return (
         <Container fluid className="centered">  
               <Row>                  
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
               {selectedObject}
         </Container>
      );
   }
}
export default Ankete;