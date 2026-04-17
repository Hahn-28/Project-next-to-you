
"use client";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './razones.css';

const reasons = [
    { number: 1, text: "Que eres cariñosa conmigo cuando estas a mi lado", category: "love" },
    { number: 2, text: "Porque eres una persona sincera en todo momento.", category: "moments" },
    { number: 3, text: "Me encantan tus ojos y cómo brillan", category: "details" },
    { number: 4, text: "Me gusta mucho la forma de tu carita", category: "details" },
    { number: 5, text: "Tus abrazos que me dan energia", category: "love" },
    { number: 6, text: "Tus labios y la forma en que sonríes.", category: "love" },
    { number: 7, text: "Por esa mirada ingenua y dulce que me das.", category: "details" },
    { number: 8, text: "Estar a tu lado y sentir tu calor", category: "love" },
    { number: 9, text: "Por tu amor puro y genuino.", category: "love" },
    { number: 10, text: "Por tus intenciones de comprender cómo te amo yo.", category: "connection" },
    { number: 11, text: "Por tu forma tan única y calmada de amar.", category: "love" },
    { number: 12, text: "Tu voz son las melodías que quisiera escuchar todas las mañanas al despertar", category: "moments" },
    { number: 13, text: "Por la seguridad que transmites.", category: "love" },
    { number: 14, text: "Por tu inmenso amor por los gatos.", category: "details" },
    { number: 15, text: "Por tu ternura que me das", category: "love" },
    { number: 16, text: "Por tu compañía, que me hace sentir que no estoy solo.", category: "love" },
    { number: 17, text: "Por tu manera de decidir quedarte conmigo.", category: "connection" },
    { number: 18, text: "Por tu hermosa sonrisa", category: "details" },
    { number: 19, text: "Por tener un corazón noble y bondadoso.", category: "connection" },
    { number: 20, text: "Por tus besitos (los que guardo y los que vendrán).", category: "details" },
    { number: 21, text: "Por tu cabello y lo bien que te queda.", category: "details" },
    { number: 22, text: "Porque eres, sin duda, el \"amor de mi vida\".", category: "love" },
    { number: 23, text: "Por lo valioso que es pasar tiempo contigo.", category: "moments" },
    { number: 24, text: "Tu amor sincero", category: "love" },
    { number: 25, text: "Porque cuando te mostré mis problemas, supiste comprenderlos.", category: "connection" },
    { number: 26, text: "Porque cuando supiste que mi forma de amar era diferente, me comprendiste.", category: "connection" },
    { number: 27, text: "Por el simple placer de escucharte hablar por horas.", category: "connection" },
    { number: 28, text: "Por tus detalles y tus regalos que guardo con cariño.", category: "details" },
    { number: 29, text: "Cuando haces contacto físico conmigo, aunque no sea tu forma principal de amar.", category: "love" },
    { number: 30, text: "Porque eres observadora y notas cosas que otros no ven.", category: "love" },
    { number: 31, text: "Por tus defectos; para mí no los tienes, pero si los tuvieras, los amaría igual.", category: "love" },
    { number: 32, text: "Por la forma en que me dices \"amor\"", category: "love" },
    { number: 33, text: "Porque confías en mí plenamente.", category: "connection" },
    { number: 34, text: "Por cómo calmas mi \"intensidad\" cuando me pierdo en mis pensamientos.", category: "love" },
    { number: 35, text: "Porque me das paz en medio de mi caos", category: "connection" },
    { number: 36, text: "Porque un mensaje tuyo puede cambiar mi día por completo", category: "moments" },
    { number: 37, text: "Porque para mí eres la mujer más hermosa que existe", category: "love" },
    { number: 38, text: "Tus manos y lo hermosas que son", category: "details" },
    { number: 39, text: "Porque tuviste el valor de volver a buscarme después de dos años.", category: "love" },
    { number: 40, text: "Porque nuestra conexión no se rompió con el tiempo", category: "moments" },
    { number: 41, text: "Por los recuerdos que compartimos en el pasado", category: "moments" },
    { number: 42, text: "Por la valentía que tuviste al escribirme de nuevo", category: "love" },
    { number: 43, text: "Por el \"ME GUSTAS TÚ\" que me escribes en mayúsculas resaltando lo que sientes", category: "love" },
    { number: 44, text: "Por cada \"buenos días\" y \"descansa\" que nos enviamos con cariño", category: "moments" },
    { number: 45, text: "Porque nuestra historia aún tiene muchas páginas en blanco", category: "moments" },
    { number: 46, text: "Por el apoyo incondicional que me das en todo lo que hago.", category: "connection" },
    { number: 47, text: "Por tu forma de ver la vida con calma", category: "love" },
    { number: 48, text: "Cuando muestras tu cariño como yo lo hago", category: "love" },
    { number: 49, text: "Por cómo te preocupas por mí cuando no me alimento bien", category: "love" },
    { number: 50, text: "Por cómo me compartes tus aficiones por la música de Monsta X y Astro", category: "details" },
    { number: 51, text: "Por la forma en que te emocionas con tus grupos favoritos", category: "love" },
    { number: 52, text: "Porque me haces querer aprender sus canciones solo para entenderte mejor", category: "connection" },
    { number: 53, text: "Por la forma en que te emocionas al ver tu anime favorito One Piece.", category: "details" },
    { number: 54, text: "Porque cuando ves un gato en la calle, te emocionas", category: "details" },
    { number: 55, text: "Porque compartimos el mismo cielo aunque estemos lejos ahora.", category: "love" },
    { number: 56, text: "Porque eres mi mayor motivación", category: "love" },
    { number: 57, text: "Porque me haces sentir que estás aquí a mi lado", category: "love" },
    { number: 58, text: "Porque eres lo primero en lo que pienso al despertar", category: "love" },
    { number: 59, text: "Por los planes que hacemos para cuando por fin nos veamos", category: "love" },
    { number: 60, text: "Porque me enseñaste que el amor de verdad no tiene límites", category: "connection" },
    { number: 61, text: "Por ese audio que me enviaste y que escucho una y otra vez.", category: "details" },
    { number: 62, text: "Por los videos cortos que me enviaste y que veo a cada rato", category: "love" },
    { number: 63, text: "Porque no me juzgas cuando me equivoco y me ayudas a aprender.", category: "love" },
    { number: 64, text: "Por tu forma de decirme las verdades aunque a veces me cueste escucharlas", category: "connection" },
    { number: 65, text: "Porque eres mi equilibrio cuando estoy muy estresado", category: "love" },
    { number: 66, text: "Porque me permites cuidarte y estar para ti", category: "love" },
    { number: 67, text: "Por cómo me haces sentir especial con un simple \"corazón\"", category: "connection" },
    { number: 68, text: "Por la tranquilidad que siento cuando sé que estás bien y feliz.", category: "connection" },
    { number: 69, text: "Porque después de dos años me di cuenta de que nadie te puede reemplazar", category: "love" },
    { number: 70, text: "Porque eres, sin duda, el capítulo más bonito de mi historia.", category: "moments" },
    { number: 71, text: "Porque aceptaste volver a intentarlo conmigo y darme una oportunidad", category: "love" },
    { number: 72, text: "Porque simplemente eres Tú y eso es más que suficiente para amarte", category: "love" },
    { number: 73, text: "Por haberme dicho que me eliges porque quieres amarme", category: "love" },
    { number: 74, text: "Porque tu amor inconsciente siempre volvió a elegirme", category: "connection" },
    { number: 75, text: "Por la sinceridad que tuviste al contarme tus miedos de hace tiempo", category: "moments" },
    { number: 76, text: "Por haberme quitado el miedo a tu pasado con tu honestidad", category: "moments" },
    { number: 77, text: "Por la forma en que confías en que podemos construir un futuro juntos", category: "moments" },
    { number: 78, text: "Por las ganas que le pones a nuestra relación a pesar de la distancia", category: "love" },
    { number: 79, text: "Porque eres mi refugio seguro después de un día cansado", category: "moments" },
    { number: 80, text: "Por la paz que me da escuchar tu respiración en nuestras llamadas", category: "connection" },
    { number: 81, text: "Por la madurez con la que manejas nuestros sentimientos", category: "love" },
    { number: 82, text: "Por ser la persona con la que quiero compartir mis logros", category: "love" },
    { number: 83, text: "Por enseñarme que el amor es una decisión valiente", category: "connection" },
    { number: 84, text: "Por cómo me complementas siendo mi polo opuesto", category: "love" },
    { number: 85, text: "Por tu paciencia conmigo cuando me pongo intenso", category: "love" },
    { number: 86, text: "Por tu humildad y sencillez", category: "love" },
    { number: 87, text: "Porque eres la única que tiene la llave de mis sentimientos", category: "love" },
    { number: 88, text: "Por el brillo que le das a mi vida desde que regresaste", category: "love" },
    { number: 89, text: "Porque eres mi Cielo y mi todo", category: "love" },
    { number: 90, text: "Porque te elijo hoy y siempre pase lo que pase", category: "moments" },
    { number: 91, text: "Por cuidarme a la distancia", category: "love" },
    { number: 92, text: "Porque eres la razón por la que no me rindo", category: "love" },
    { number: 93, text: "Por las canciones que compartimos", category: "love" },
    { number: 94, text: "Porque no necesito razones para amarte pero me gusta recordártelas", category: "love" },
    { number: 95, text: "Por quitarme la culpa que sentías al ser honesta", category: "love" },
    { number: 96, text: "Porque ahora nuestra relación empezó de verdad sin secretos", category: "love" },
    { number: 97, text: "Por la sensación de alivio que me diste con tu último mensaje", category: "details" },
    { number: 98, text: "Porque me haces sentir que mi amor sí es correspondido de verdad", category: "love" },
    { number: 99, text: "Por el apoyo incondicional que siento de tu parte", category: "connection" },
    { number: 100, text: "Porque cada día encuentro una razón nueva para estar a tu lado", category: "moments" },
    { number: 101, text: "Porque eres tú y siempre serás tú", category: "love" }
];

export default function RazonesPage() {
    const [filter, setFilter] = useState('all');
    const [displayedReasons, setDisplayedReasons] = useState(reasons);

    useEffect(() => {
        let filtered = reasons;
        if (filter !== 'all') {
            filtered = reasons.filter(r => r.category === filter);
        }
        setDisplayedReasons(filtered);
    }, [filter]);

    return (
        <div className="container min-h-screen relative pb-20">
            <Link 
                href="/"
                className="fixed top-6 left-6 z-100 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-cyan-500/30 hover:bg-cyan-900/50 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2 group"
            >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>

            <header className="header">
                <div className="header-decoration">
                    <div className="cloud cloud-1"></div>
                    <div className="cloud cloud-2"></div>
                    <div className="cloud cloud-3"></div>
                </div>
                <div className="header-content">
                    <img src="/razones_static/content/Tu y Yo/Header.png" alt="Somos nosotros." className="header-image" />
                    <h1 className="main-title">Las 100 razones por las que te quiero Cielo Nicolle</h1>
                    <p className="subtitle">Mi preciosa, mi niña, mi amor... cada razón es un pedacito de mi corazón</p>
                </div>
            </header>

            <nav className="navigation flex flex-wrap justify-center gap-4 my-8 relative z-50">
                <button className={`nav-btn ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>Todas las razones</button>
                <button className={`nav-btn ${filter==='connection'?'active':''}`} onClick={() => setFilter('connection')}>Nuestra conexión</button>
                <button className={`nav-btn ${filter==='moments'?'active':''}`} onClick={() => setFilter('moments')}>Momentos especiales</button>
                <button className={`nav-btn ${filter==='details'?'active':''}`} onClick={() => setFilter('details')}>Pequeños detalles</button>
                <button className={`nav-btn ${filter==='love'?'active':''}`} onClick={() => setFilter('love')}>Simplemente te quiero</button>
            </nav>

            <main className="main-content">
                <div className="reasons-grid">
                    {displayedReasons.map(reason => (
                        <div key={reason.number} className="reason-card fade-in bounce-in">
                            <div className="reason-number">{reason.number}</div>
                            <p className="reason-text">{reason.text}</p>
                        </div>
                    ))}
                </div>
            </main>

            
        <section className="gallery">
            <h2 className="gallery-title">Ella eres tú mi amor</h2>
            <div className="gallery-grid">
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/1-.jpg" alt="My Melody 1" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/2-My Melody and Kuromi.jpg" alt="My Melody y Kuromi" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/3-My melody cone.jpg" alt="My Melody Cone" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/4-my melodyy.webp" alt="My Melody" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/5-.jpg" alt="My Melody 5" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/6-.jpg" alt="My Melody 6" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/7-ll.jpg" alt="My Melody 7" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/8-.jpg" alt="My Melody 8" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/9-daily sanrio  daiIysanrio on X.jpg" alt="Daily Sanrio" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/11-y elody.jpg" alt="My Melody 11" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/12-Loving my melody  animal crossing 3.jpg" alt="My Melody Animal Crossing" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/13-.jpg" alt="My Melody 13" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/14-.jpg" alt="My Melody 14" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/15-my melody.jpg" alt="My Melody 15" className="gallery-image" />
                </div>
                <div className="gallery-item">
                    <img src="/razones_static/content/mymelody/16-.jpg" alt="My Melody 16" className="gallery-image" />
                </div>
            </div>
        </section>

        

            <footer className="footer mt-10 text-center pb-10 relative z-50">
                <p className="footer-text font-bold text-xl text-cyan-300">Con todo mi corazón, tu amor</p>
                <div className="footer-image flex justify-center mt-4">
                    <img src="/razones_static/content/pompompurin/4-l on TikTok.jpg" alt="Footer img" className="footer-img w-48 rounded-2xl" />
                </div>
            </footer>
        </div>
    );
}



