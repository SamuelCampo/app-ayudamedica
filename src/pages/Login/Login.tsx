import { IonContent, IonPage, IonText, IonInput, IonButton, IonCheckbox, IonItem, IonLabel,IonSpinner } from "@ionic/react"
import React,{ useState } from "react"
import { useHistory } from "react-router-dom";
import "./Login.css"
import { useForm, Controller } from "react-hook-form"
import { LoginInterface } from './../../Interface/Login'
import global from './../../global'

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
      <IonContent>
        <div className="ion-padding">
			<div>
				<h1>Iniciar <span><br /> Sesión </span></h1>
				<IonText>Inicia sesión para continuar</IonText>
				<div className="form-login">
					<form onSubmit={handleSubmit(logging)}>
							<IonLabel>Ingresa tu nombre</IonLabel>
							<IonInput className="form-input" { ...register('name') }  placeholder=""/>
							<div className="text-center">
								 { !statusform ? <button type="submit">Enviar</button> : <IonSpinner name="circles" /> }
							</div>
					</form>
				</div>
			</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;