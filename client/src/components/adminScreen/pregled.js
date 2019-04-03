import React, { Component } from 'react';

import {
  Container,
  Row,
  Jumbotron,
  FormGroup,
  Input,
  Col
} from 'reactstrap';

class Pregled extends Component {
   constructor(props) {
      super(props);
    
      this.state = {
         bazaVrste:[],
         bazaKorisnika: [],
         selectedKorisnik: null,
         bazaPitanja: [],
         selectedPitanje: null,
         bazaAnketa: [],
         selectedAnketa: null,
         selectedPregled: null,
         bazaOdgovori: null  // na pitanje broj odgovora po oceni 
      };
    }
   
    getKorisniciList = () => {
      fetch('/api/korisnik')
      .then(res => res.json())
      .then(res => this.setState({ bazaKorisnika: res }))
   } 

   getPitanjaList = () => {
      fetch('/api/pitanja')
      .then(res => res.json())
      .then(res => this.setState({ bazaPitanja: res })) 
   }
   
   getVrsteList = () => {
      fetch('/api/vrste/bezAdmina')
      .then(res => res.json())    
      .then(res => this.setState({ bazaVrste: res }))      
   }

   getAnketeList = () => {
      fetch('/api/ankete')
      .then(res => res.json())
      .then(res => this.setState({ bazaAnketa: res }))
   }

   getOdgovoriPoAnketi = () => {
      fetch('/api/odgovori/ankete')
      .then(res => res.json())
      .then(res => this.setState({ bazaOdgovori: res }))
   }

   handleChangePregled(pregled){ 
      this.setState({ selectedPregled: pregled });
   }

   handleChangePitanja = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedPitanje = this.state.bazaPitanja.filter(pitanje => pitanje.id_pitanja == id[0])[0];     
      this.setState({ selectedPitanje })      
   }

   handleChangeAnketa = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedPitanje = this.state.bazaPitanja.filter(pitanje => pitanje.id_pitanja == id[0])[0];     
      this.setState({ selectedPitanje })      
   }

   handleChangeKorisnik = (e) => {
      var id= e.target.value.split(".");
      // eslint-disable-next-line
      var selectedPitanje = this.state.bazaPitanja.filter(pitanje => pitanje.id_pitanja == id[0])[0];     
      this.setState({ selectedPitanje })      
   }

   componentDidMount () {
      this.getVrsteList();
      this.getPitanjaList();
      this.getAnketeList();
      this.getKorisniciList();
      this.getOdgovoriPoAnketi();
   } 

   tabelaP = () => {
      var niz = this.state.bazaOdgovori;
      if (!niz) return ;
      var celaTabela;
      for(let i = 0 ; i < this.state.bazaPitanja.length ; i++){
         // eslint-disable-next-line
         celaTabela = [celaTabela, this.grupaUtabeliP(niz.filter(poPitanju => poPitanju.pitanje_id == this.state.bazaPitanja[i].id_pitanja),this.state.bazaPitanja[i].pitanje)]
      } 
      return celaTabela
   }

   grupaUtabeliP(niz, nazivGrupe){
      var poruka = nazivGrupe + " Nije odgovarano na ovo pitanje !" 
      var grupa ;
      if(niz.length !== 0) { 
         poruka = nazivGrupe;               
         for(let i=0 ; i<niz.length ; i+=6){
            // eslint-disable-next-line
            grupa = [grupa, this.redUtabeliP(niz.filter(poAnketi => poAnketi.anketa_id == niz[i].anketa_id))]
         }
      }
      return(
         <table className="table blue table-bordered">
            <tr>
               <th colspan="7" style={{textAlign: "center"}}>{poruka}</th>
            </tr>
            <tr>
               <th>ankete \ ocena</th>
               <th>0</th>
               <th>1</th>
               <th>2</th>
               <th>3</th>
               <th>4</th>
               <th>5</th>
            </tr>
            {grupa} 
         </table> 
      )
   }

   redUtabeliP(niz){
      if (!niz) return ;
      var clan = this.state.bazaAnketa.filter(anketa => anketa.id_ankete == niz[0].anketa_id)[0].naziv_ankete;
      var red;          
      for(let i=0 ; i<6 ; i++){
        red =[red, <td>{niz[i].suma}</td>]
      }      
      return(
         <tr>
            <td>{clan}</td>
            {red}
         </tr>
      )
   }

   tabelaA = () => {      
      var niz = this.state.bazaOdgovori;
      if (!niz) return ;
      var celaTabela;
      for(let i = 0 ; i < this.state.bazaAnketa.length ; i++){
         // eslint-disable-next-line
         celaTabela = [celaTabela, this.grupaUtabeliA(niz.filter(poAnketi => poAnketi.anketa_id == this.state.bazaAnketa[i].id_ankete),this.state.bazaAnketa[i].naziv_ankete)]
      } 
      return celaTabela
   }
   
   grupaUtabeliA(niz, nazivGrupe){ 
      var grupa ;       
      for(let i=0 ; i<niz.length ; i+=6){
         // eslint-disable-next-line
         grupa = [grupa, this.redUtabeliA(niz.filter(poPitanju => poPitanju.pitanje_id == niz[i].pitanje_id))]
      }
      return(
         <table className="table blue table-bordered">
            <tr>
               <th colspan="7" style={{textAlign: "center"}}>{nazivGrupe}</th>
            </tr>
            <tr>
               <th>pitanje \ ocena</th>
               <th>0</th>
               <th>1</th>
               <th>2</th>
               <th>3</th>
               <th>4</th>
               <th>5</th>
            </tr>
            {grupa} 
         </table> 
      )
   }

   redUtabeliA(niz){
      var clan = this.state.bazaPitanja.filter(pitanje => pitanje.id_pitanja == niz[0].pitanje_id)[0].pitanje;
      var red;          
      for(let i=0 ; i<6 ; i++){
        red =[red, <td>{niz[i].suma}</td>]
      }      
      return(
         <tr>
            <td>{clan}</td>
            {red}
         </tr>
      )
   }  

   tabelaK = () => {      
      var niz = this.state.bazaOdgovori;
      /* if (!niz) return ;
      var celaTabela;
      for(let i = 0 ; i < this.state.bazaAnketa.length ; i++){
         // eslint-disable-next-line
         celaTabela = [celaTabela, this.grupaUtabeliA(niz.filter(poAnketi => poAnketi.anketa_id == this.state.bazaAnketa[i].id_ankete),this.state.bazaAnketa[i].naziv_ankete)]
      } 
         return celaTabela */
         console.log(niz);
         return 
   }

   render() {
      let selectedObject;
      if (this.state.selectedPitanje) {
         selectedObject = <div className="red center"> {this.state.selectedPitanje.pitanje}</div>;
      };

      var pitanja = this.tabelaP();
      var ankete = this.tabelaA();
      var korisnici = this.tabelaK();
         
      if(this.state.selectedPregled === "p")selectedObject = pitanja; 
      if(this.state.selectedPregled === "a")selectedObject = ankete;
      if(this.state.selectedPregled === "k")selectedObject = korisnici;

      return (
         <Container fluid className="centered">                 
            <Jumbotron>
               <Row>
                  <Col>
                     <button className="btn-primary" style={{padding:0 + "," + 0 }}  value="p" onClick={()=>this.handleChangePregled('p')}>Pitanja</button><br/>   <br/>         
                     <FormGroup>
                        <Input type="select" onChange={this.handleChangePitanja}>
                           { this.state.bazaPitanja.length === 0 && <option>Nisu još dodata pitanja.</option> }
                           { this.state.bazaPitanja.length > 0 && <option>Selektuj pitanje.</option> }
                           { this.state.bazaPitanja.map((pitanje, i) => <option key={i} id={pitanje.id_pitanja}>{pitanje.id_pitanja}. {pitanje.pitanje}</option>) }                 
                        </Input>             
                     </FormGroup>
                  </Col>
                  <Col>   
                  <button className="btn-primary" style={{padding:0 + "," + 0 }} value="a" onClick={()=>this.handleChangePregled('a')}>Ankete</button><br/>   <br/>            
                     <FormGroup>
                        <Input type="select" onChange={this.handleChangeAnketa}>
                           { this.state.bazaAnketa.length === 0 && <option>Nisu još dodate ankete</option> }
                           { this.state.bazaAnketa.length > 0 && <option>Selektuj anketu</option> }
                           { this.state.bazaAnketa.map((anketa, i) => <option key={i} id={anketa.id_ankete}>{anketa.id_ankete}. {anketa.naziv_ankete}</option>) }                 
                        </Input>             
                     </FormGroup>
                  </Col>
                  <Col>
                  <button className="btn-primary" style={{padding:0 + "," + 0 }} value="k" onClick={()=>this.handleChangePregled('k')}>Korisnici</button><br/>   <br/>            
                     <FormGroup>
                        <Input type="select" onChange={this.handleChangeKorisnik}>
                           { this.state.bazaKorisnika.length === 0 && <option>Nisu još dodate ankete</option> }
                           { this.state.bazaKorisnika.length > 0 && <option>Selektuj korisnika</option> }
                           { this.state.bazaKorisnika.map((korisnik, i) => <option key={i} id={korisnik.id_korisnik}>{korisnik.id_korisnik}. {korisnik.log_ime}</option>) }                 
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
export default Pregled;