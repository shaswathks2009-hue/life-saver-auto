const junctions = [
  {id:"A",name:"Junction A — Demo Main Road",at:25,state:"waiting"},
  {id:"B",name:"Junction B — Demo Hospital Road",at:58,state:"waiting"},
  {id:"C",name:"Junction C — Demo Market Road",at:84,state:"waiting"}
];
let running=false, progress=0, timer=null, activeAlert=null;
const $=id=>document.getElementById(id);
function log(message){const li=document.createElement("li");li.textContent=new Date().toLocaleTimeString()+" — "+message;$("activityLog").prepend(li);}
function renderJunctions(){
  $("junctionList").innerHTML="";
  junctions.forEach(j=>{
    const row=document.createElement("div");row.className="junction";
    const status=j.state==="alerted"?"ALERT SENT":j.state==="passed"?"PASSED":"WAITING";
    row.innerHTML=`<div class="junction-icon">🚦</div><div class="junction-info"><strong>${j.name}</strong><small>Route point: ${j.at}% of demo route</small></div><span class="junction-status ${j.state}">${status}</span>`;
    $("junctionList").appendChild(row);
  });
}
function setScreen(message,sub,alerting){
  $("screenMessage").textContent=message;$("screenSub").textContent=sub;
  $("roadsideScreen").classList.toggle("alerting",!!alerting);
}
function startTrip(){
  if(running)return;
  running=true;$("startBtn").disabled=true;$("stopBtn").disabled=false;
  $("tripDot").classList.add("active");$("tripStatus").textContent="Trip active — monitoring demo route";
  log("Ambulance trip started. Automatic junction monitoring enabled.");
  $("locationText").textContent="Demo GPS: simulated route coordinates (not live GPS)";
  timer=setInterval(()=>{
    if(!running)return;
    progress=Math.min(100,progress+1);
    $("progressBar").style.width=progress+"%";$("progressText").textContent=progress+"%";
    junctions.forEach(j=>{
      if(j.state==="waiting" && progress>=j.at-8){
        j.state="alerted";activeAlert=j;
        setScreen("AMBULANCE APPROACHING","PLEASE GIVE WAY SAFELY • "+j.name,true);
        log("Automatic demo alert sent to registered display: "+j.name+".");
      }
      if(j.state==="alerted" && progress>=j.at+4){
        j.state="passed";
        log("Demo ambulance passed "+j.name+"; alert cleared automatically.");
        if(activeAlert && activeAlert.id===j.id){
          activeAlert=null;setScreen("NO ACTIVE ALERT","Previous junction passed; monitoring next junction",false);
        }
      }
    });
    renderJunctions();
    if(progress>=100){
      stopTrip(true);
      $("tripStatus").textContent="Demo trip completed";
      $("locationText").textContent="Demo route completed. No real roadside system was contacted.";
      log("Demo trip completed.");
    }
  },350);
}
function stopTrip(completed=false){
  running=false;if(timer){clearInterval(timer);timer=null;}
  $("startBtn").disabled=false;$("stopBtn").disabled=true;$("tripDot").classList.remove("active");
  if(!completed)$("tripStatus").textContent="Trip stopped";
  if(!completed)log("Trip stopped by user; automatic monitoring ended.");
}
$("startBtn").addEventListener("click",startTrip);
$("stopBtn").addEventListener("click",()=>stopTrip(false));
$("clearBtn").addEventListener("click",()=>{
  activeAlert=null;setScreen("NO ACTIVE ALERT","Demo alert cleared manually",false);
  junctions.forEach(j=>{if(j.state==="alerted")j.state="waiting";});
  renderJunctions();log("Demo display alert cleared manually.");
});
$("savePatientBtn").addEventListener("click",()=>{
  const status=$("condition").value;
  const notes=$("notes").value.trim();
  log("Demo patient update saved: "+status+(notes?" — "+notes:"")+".");
  alert("Demo patient update saved locally. It was not sent to a hospital.");
});
renderJunctions();