const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();

// Filter tabs
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Scroll reveal
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:.1});

document.querySelectorAll('.product-card,.craft-step,.testi-card,.stat').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(30px)';
  el.style.transition='opacity .6s ease, transform .6s ease';
  obs.observe(el);
});
// ══ EmailJS Contact Form ══
emailjs.init("z7ewLzi7-gdrAgMW5");

document.querySelector('.btn-primary[style*="flex-start"], .contact-form .btn-primary')
  ?.addEventListener('click', sendContactEmail);

function sendContactEmail() {
  const name    = document.querySelector('#contact .form-input:nth-child(1)')?.value || 
                  document.querySelector('[placeholder="Your name"]')?.value;
  const phone   = document.querySelector('[placeholder="+880"]')?.value;
  const email   = document.querySelector('[placeholder="your@email.com"]')?.value;
  const message = document.querySelector('.form-textarea')?.value;

  if (!name || !phone || !message) {
    alert('সব তথ্য পূরণ করুন!'); return;
  }

  emailjs.send("service_a5lvull", "template_47p8jam", {
    from_name:  name,
    phone:      phone,
    from_email: email,
    message:    message
  }).then(() => {
    alert('✅ Message পাঠানো হয়েছে! শীঘ্রই যোগাযোগ করা হবে।');
  }).catch(() => {
    alert('❌ Error! আবার চেষ্টা করুন।');
  });
}