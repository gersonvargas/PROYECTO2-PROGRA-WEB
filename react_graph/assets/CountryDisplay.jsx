var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var ButtonGroup = Reactstrap.ButtonGroup;

class CountryDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id:"",name:"",area:0,population:0,density:0}
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({id:nextProps.country.id});
        this.setState({name:nextProps.country.name});
        this.setState({area:nextProps.country.area});
        this.setState({population:nextProps.country.population});
        this.setState({density:nextProps.country.density});
    }
    handleEdit() {
           this.props.handleEditData();
    }
    render() {
         return(<Form color="primary">
            <FormGroup><Label>Nombre:</Label>
                <Input type="text" name="name" readonly="readonly"
                    value={this.state.name}/></FormGroup>
            <FormGroup><Label>Area:</Label>
                <Input type="text" name="area" readonly="readonly"
                    value={this.state.area}/></FormGroup>
             <FormGroup><Label>Population:</Label>
                <Input type="text" name="population" readonly="readonly"
                    value={this.state.population}/></FormGroup>
            <FormGroup><Label>Density:</Label>
                <Input type="text" name="density" readonly="readonly"
                    value={this.state.density}/></FormGroup>
            <Input type="hidden" name="id" value={this.state.id}/>
            <ButtonGroup>
                <Button onClick={this.handleEdit}>Editar</Button>
            </ButtonGroup>
            </Form>)
     }
 }