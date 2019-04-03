import React, {Component} from 'react';
import {
  Container,
  Row,
  Jumbotron,
  FormGroup,
  Input,
  Col
} from 'reactstrap';

class Dashboard extends Component {
  
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
         korisnik_id: null,
         selAn: "Selektuj anketu"
      };    
    }   

   getNepopunjeneAnketeList = () => {
      fetch(`/api/ankete/nepopunjene/${this.props.userId}`)
      .then(res => res.json())
      .then(res => {      
         var bazaAnketa = res;
         this.setState({ bazaAnketa });   
      })
   }
   
   getVrsteList = () => {
      fetch('/api/vrste/bezAdmina')
      .then(res => res.json())    
      .then(res => this.setState({ bazaVrste: res }))
   };    

   handleChangeAnketa = (e) => {
      var id= e.target.value.split(".");
      var selAn = e.target.value;
      // eslint-disable-next-line
      var selectedAnketa = this.state.bazaAnketa.filter(anketa => anketa.id_ankete == id[0])[0]; 
      this.setState({ 
         selectedAnketa,
         selAn
      });
      if(selectedAnketa){
      fetch(`/api/pitanja/anketa/${selectedAnketa.id_ankete}`)
         .then(res => res.json())
         .then(res => {
            var r1 = res.map((item) => {
               var a = {
                  id_pitanja : item.id_pitanja,
                  pitanje : item.pitanje,
                  odgovor : 0
               }
               return a
            }) 
            this.setState({ 
               pitanjaUAnketi: r1
            })
         })          
      }       
   }

   handleRadioChange = (e) => {
      if(e.target.value !== undefined) {
         var selectedOption = this.state.pitanjaUAnketi;
         selectedOption[e.target.name].odgovor = e.target.value;
         this.setState({ pitanjaUAnketi: selectedOption });
      };
   }

   toggleRadio(){
      console.log("toggle")
   }

   handleSubmit = (e) => {
      e.preventDefault();
      for (const pitanje of this.state.pitanjaUAnketi){
         this.snimiOdgovore(pitanje.id_pitanja, pitanje.odgovor)
      }
      this.getNepopunjeneAnketeList();
      this.setState({
         selectedAnketa: null,
         selAn: "Selektuj anketu"
      });      
   }

   snimiOdgovore(pitanje, odgovor){
      fetch('/api/odgovori', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
            anketa:  this.state.selectedAnketa.id_ankete, 
            korisnik: this.props.userId,
            pitanje: pitanje,
            odgovor: odgovor
          })
      }) 
   }

   componentDidMount () {
      this.getVrsteList();      
   }   

   render() { 
      if(!this.props.userId){ 
         return (<div> Morate se prijaviti </div>) 
      }else{
         if(this.state.bazaAnketa.length === 0) {
         this.getNepopunjeneAnketeList();
      }}
      let dropdown = 
            <Input type="select" value = {this.state.selAn}  onChange={this.handleChangeAnketa}>
            { this.state.bazaAnketa.length === 0 && <option>Nisu još dodate ankete</option> }
            { this.state.bazaAnketa.length > 0 && <option>Selektuj anketu</option> }
            { this.state.bazaAnketa.map((anketa, i) => <option key={i} id={anketa.id_ankete}>{anketa.id_ankete}. {anketa.naziv_ankete}</option>) }                 
             </Input> ;
      let selectedObject;
      if (this.state.selectedAnketa) {
         var datumi = this.state.selectedAnketa.datum.substr(1,21).split(',');         
         
         var pitanjaUanketi = this.state.pitanjaUAnketi.map((pitanja, i) => 
           <div className="yellow" key={i} style={{margin:15 +'px'}}> {pitanja.id_pitanja}. {pitanja.pitanje}
              <span className="right">
                  <label onClick={this.handleRadioChange} style={{marginLeft:20 +'px'}}>ocena 1
                     <input type="radio" name={i} value="1" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}}
                      onChange={this.toggleRadio} checked={this.state.pitanjaUAnketi[i].odgovor === '1'}  />
                  </label>
                  <label onClick={this.handleRadioChange} style={{marginLeft:20 +'px'}}>ocena 2
                     <input type="radio" name={i} value="2" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} 
                     onChange={() => this.toggleRadio} checked={this.state.pitanjaUAnketi[i].odgovor === '2'}  />
                  </label> 
                  <label onClick={this.handleRadioChange} style={{marginLeft:20 +'px'}}>ocena 3 
                     <input type="radio" name={i} value="3" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} 
                     onChange={() => this.toggleRadio} checked={this.state.pitanjaUAnketi[i].odgovor === '3'}  />
                  </label> 
                  <label onClick={this.handleRadioChange} style={{marginLeft:20 +'px'}}>ocena 4 
                     <input type="radio" name={i} value="4" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} 
                     onChange={() => this.toggleRadio} checked={this.state.pitanjaUAnketi[i].odgovor === '4'}  />
                  </label> 
                  <label onClick={this.handleRadioChange} style={{marginLeft:20 +'px'}}>ocena 5 
                     <input type="radio" name={i} value="5" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} 
                     onChange={() => this.toggleRadio} checked={this.state.pitanjaUAnketi[i].odgovor === '5'}  />
                  </label>

               </span>
            </div>); 
         
         var dugmeSubmit;
         
         if (this.state.pitanjaUAnketi.length > 0){
            dugmeSubmit = 
            <div>
               <button className="btn-primary " style={{padding:0 + "," + 0}} type="submit" >snimi anketu</button>
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
                  pitanja u anketi
               </div>
               <form onSubmit = {this.handleSubmit}>
                  {pitanjaUanketi}  
                   {dugmeSubmit}
               </form>               
               </Col>               
            </Row>                       
         </div>; 
       };

      return (
         <Container fluid className="centered">                    
            <Jumbotron>
               <Row>                  
                  <Col>
                     <h1 className="display-5">Ankete</h1>             
                     <FormGroup>
                        {dropdown}         
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
export default Dashboard;