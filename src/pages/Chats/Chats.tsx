import React,{useEffect,useState,useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { IonPage,IonContent,IonToolbar,IonHeader,IonButtons,IonBackButton,IonTitle,IonInput, IonIcon,IonText,IonButton,IonModal,IonSelect,IonSelectOption } from '@ionic/react'
import global from './../../global'
import './Chats.css'
import { push, sendOutline } from 'ionicons/icons'
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom'

const Chats = () => {
	const history = useHistory();
	let params: any = useParams()
	const modal = useRef<HTMLIonModalElement>(null)
	const contentMessage = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false)
	let date = new Date()
	const [service,setService] = useState({
		id_t2:'',
		servicio_t2: ''
	})
	const [messages,setMessages] = useState([
		{
			id:1,
			texto:'¡Buen día! El médico está a su servicio'
		},
		{
			id:1,
			texto:'¿Nos regalas tu nombre por favor?'
		}
	])
	const [step,setStep] = useState(0)
	const [dataForm,setDataForm] = useState({
		name:'',
		phone:'',
		typeDoc:'',
		direction:'',
		localidad:'',
		municipio:'',
		genero:'',
		id:''
	})
	const getIdService = () => {
		var formData = new FormData()
		let myHeaders = new Headers();
		let token = localStorage.getItem('token')
		myHeaders.append('Authorization','Bearer '+token)
		
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		};
		let url = "localhost/proyecto/" + 'get/service'
		fetch(global.GetUrl + `get/services/${params.id}`, requestOptions)
		.then(response => {
			response.json()
			.then(response => {
				if(response.status){
					setService(response.content);
				}else{
					
				}
			})
		})
		.catch(error => console.log('error', error));
	}
	const { control, register, handleSubmit,reset,formState, formState: { errors,isSubmitSuccessful } } = useForm({
		defaultValues: { messages:'' },
		mode:"onChange",
	});
	const stepMessage = async (data: any) => {
		switch (step) {
			case 0:
				let response = {
					id:2,
					texto:data.messages
				}
				dataForm.name = data.messages
				setDataForm(dataForm)
				let questNext = {
					id:1,
					texto:'¿Nos puedes regalar ahora tu número de telefono?'
				}
				await setMessages([...messages,response,questNext]);
				break;
			case 1:
				let responsePhone = {
					id:2,
					texto:data.messages
				}
				dataForm.phone = data.messages
				setDataForm(dataForm)
				let questNextId = {
					id:1,
					texto:'Documento del paciente'
				}
				await setMessages([...messages,responsePhone,questNextId]);
				break;
			case 2: 
				let responseId = {
					id:2,
					texto:data.messages
				}
				let questNextType = {
					id:1,
					texto:`
							<p>Tipo de documentos</p>
							<ul>
								<li>CC</li>
								<li>CE</li>
								<li>PP</li>
								<li>PEP</li>
							</ul>
						` 
				}
				dataForm.id = data.messages
				setDataForm(dataForm)
				await setMessages([...messages,responseId,questNextType]);
			break;
			case 3:
				let responseTypeDoc = {
					id:2,
					texto:data.messages
				}
				let responseNextGenere = {
					id:1,
					texto:'Seleccione el genero que lo identifique'
				}
				dataForm.typeDoc = data.messages
				setDataForm(dataForm)
				setIsOpen(true)
				await setMessages([...messages,responseTypeDoc,responseNextGenere]);
				break;
			case 4:
				let responseDir = {
					id:2,
					texto:data.messages
				}
				let questNextService = {
					id:1,
					texto:`
							Nuestro equipo lo atendera lo antes posible
						` 
				}
				dataForm.id = data.messages
				setDataForm(dataForm)
				setTimeout(() => {
					history.push("/video")
				}, 2000);
				
				await setMessages([...messages,responseDir,questNextService]);
				
				break;
			default:
				break;
		}
		let num = step + 1
		setStep(num)
	}

	const handleSetGenere = (genere:string) => {
		let responseId = {
			id:2,
			texto:genere
		}
		dataForm.genero = genere
		setDataForm(dataForm)
		setIsOpen(false)
		let responseDirection = {
			id:1,
			texto:'Por favor indiquenos su dirección'
		}
		setMessages([...messages,responseId,responseDirection]);
	}

	useEffect(() => {
		getIdService()
	},[])

	useEffect(() => {
		if(formState.isSubmitSuccessful){
			reset({
				messages:''
			})
		}
		contentMessage.current?.scrollTo({
			top: contentMessage.current?.clientHeight,
		})
	},[reset,formState])
	return (
		<>
			<IonPage>
				<IonContent fullscreen={true}>
					<IonHeader className="ion-no-border">
						<IonToolbar color="primary">
							<IonButtons slot="start">
								<IonBackButton defaultHref='/services'/>
							</IonButtons>
							<IonTitle>Formulario de <b>{ service.servicio_t2 }</b></IonTitle>
						</IonToolbar>
					</IonHeader>
					<div className="content-message-container" id="contentMessageId" ref={contentMessage}>
						{
							messages.map((item,i) => 
								<div key={i} className={item.id === 2 ? 'content-message content-message-right animate__animated animate__fadeInUp' : 'content-message content-message-left animate__animated animate__fadeInUp'}>
									<IonText dangerouslySetInnerHTML={{__html: item.texto}}></IonText>
								</div>
							)
						}
					</div>
					<div className="mensaje">
						<form onSubmit={handleSubmit(stepMessage)}>
							<IonInput placeholder="Escribir mensaje" {...register('messages') }/>
							<button className='icon-send'>
								<IonIcon slot="start"  icon={sendOutline} />
							</button>
						</form>
					</div>
					<IonModal ref={modal} trigger="open-modal" isOpen={isOpen} initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
						<IonContent className="ion-padding">
						<p>Seleccione un genero</p>
						<IonSelect onIonChange={ (e) => handleSetGenere(e.detail.value) } defaultValue={'Seleccione su genero'}>
							<IonSelectOption value="Femenino">Femenino</IonSelectOption>
							<IonSelectOption value="Masculino">Masculino</IonSelectOption>
						</IonSelect>
						</IonContent>
					</IonModal>
				</IonContent>
			</IonPage>
		</>
	)
}

export default Chats