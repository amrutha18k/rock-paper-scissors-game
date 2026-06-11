  const score= JSON.parse(localStorage.getItem('score'))|| {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElm();
    
  /*
    if(!score){
      score={
        wins:0,
        losses:0,
        ties=0;
      }
    }
    just another way
  */

 
  function pickCmpMov(){
    let cmpMov=' ';
    const randNum = Math.random();
    if(randNum>=0&&randNum<1/3){
      cmpMov='rock';
    }else if(randNum>=1/3&&randNum<=2/3){
      cmpMov='paper';
    }else{ 
      cmpMov='scissors';
    }
    return cmpMov;
  }

  let isAutoPlaying=false;
  let intId;
  function autoPlay(){
      if(!isAutoPlaying){
        intId= setInterval(function(){
        const playerMov=pickCmpMov();
          playGame(playerMov);
        },1000);
        isAutoPlaying=true;
        let msg=document.querySelector('.auto-msg');
        msg.classList.add('js-auto-msg');
        msg.innerHTML='autoplay started.';
        setTimeout(function(){
          msg.innerHTML='';
          msg.classList.remove('js-auto-msg');
          },2000);
      }
      else{
        clearInterval(intId);
        isAutoPlaying=false;
        let msg=document.querySelector('.auto-msg');
        msg.classList.add('js-auto-msg');
        msg.innerHTML='autoplay stopped.';
        setTimeout(function(){
          msg.innerHTML='';
          msg.classList.remove('js-auto-msg');
          },2000);
      }   
  }

  function playGame(playerMov){
  let res=' ';
  let cmpMov= pickCmpMov();
  if(playerMov=='paper'){
      if(cmpMov==='rock'){
      res='you win';
    }else if(cmpMov==='paper'){ 
      res='tie';
    }else{
      res='you lose';
    }
  }

  else if(playerMov=='scissors'){
    if(cmpMov==='rock'){
      res='you lose';
    }else if(cmpMov==='paper'){ 
      res='you win';
    }else{
      res='tie';
    }
  }

  else {
    if(cmpMov==='rock'){
      res='tie';
    }else if(cmpMov==='paper'){ 
      res='you lose';
    }else{
      res='you win';
    }  
  }

  if(res==='you win'){
    score.wins+=1;
  }else if(res==='you lose'){
    score.losses+=1;
  }else{
    score.ties+=1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElm();

  document.querySelector('.js-res')
    .innerHTML= `${res}`;

  document.querySelector('.js-mov')
    .innerHTML=`your move:<img src="rpsemoj/${playerMov}-emoji.png" class="mov-icon"> - computer's move <img src="rpsemoj/${cmpMov}-emoji.png" class="mov-icon">`;

}

function updateScoreElm(){
  document.querySelector('.js-score')
  .innerHTML= `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties} `;
}
