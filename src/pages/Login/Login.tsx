import { IonContent, IonPage, IonText, IonInput, IonButton, IonCheckbox, IonItem, IonLabel,IonSpinner, IonRow, IonCol } from "@ionic/react"
import React,{ useState } from "react"
import { useHistory } from "react-router-dom";
import "./Login.css"
import { useForm, Controller } from "react-hook-form"
import { LoginInterface } from './../../Interface/Login'
import global from './../../global'
import backgroundInit from './../../assets/img/backgroundInit.png'
import	icon_logo from './../../Images/logo.png'
import	user from './../../Images/user.png'
import Container from "../../components/Container/Container";

interface ini {
	name: string;
}

const Login: React.FC = () => {
  const [statusform,setformStatus] = useState(false)
  let history = useHistory();
  let initValues = {
	name: '',
  }

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initValues,
	mode:"onChange",
  });

  const logging = (data: ini) => {
		localStorage.setItem('name',data.name);
		setformStatus(true)
		history.push('/home')
  }	

  return (
    <IonPage>
      <IonContent fullscreen>
	  <Container>
			<div className="ion-header">
				<div>
					<IonRow>
							<IonCol size="12" className="text-left">
									<img src={icon_logo} className="" alt="" />
							</IonCol>
					</IonRow>
					<IonText>
							<h3>¡Bienvenido !</h3>
					</IonText>
					<IonText>
							Nuestra app en Ayudamedica esta pensada para tí
					</IonText>
					<div className="form-login">
							<form onSubmit={handleSubmit(logging)}>
									<IonLabel>Ingresa tu nombre</IonLabel>
									<IonInput className="form-input" { ...register('name') }  placeholder=""/>
									<div className="text-center">
										{ !statusform ? <button type="submit">Enviar</button> : <IonSpinner name="circles" /> }
									</div>
							</form>
					</div>
					<IonRow>
							<IonCol>
								<IonText>
								Todos los datos incluidos en esta app están estrictamente protegidos, puedes verlo en nuestra política de tratamiendo de datos
								</IonText>
							</IonCol>
					</IonRow>
				</div>
			</div>
		</Container>
      </IonContent>
    </IonPage>
  );
};

export default Login;