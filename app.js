var app = new Vue({
    el: '#app',
    data: {
        myChoice : null,
        comChoice : null,
        winner : null,
        count:3,
        lifeOfMe:3,
        lifeOfCom:3,
        isSelectable: true,
        logs:[],
        selects : [
            { name : '가위' , value : 'scissor'},
            { name : '바위' , value : 'rock'},
            { name : '보' , value : 'paper'},
        ]
    },
    computed:{
        myChoiceImg(){
            return this.myChoice !== null ? `images/${this.myChoice}.jpg` : 'images/question.jpg' 
        },
        comChoiceImg(){
            return this.comChoice !== null ? `images/${this.comChoice}.jpg` : 'images/question.jpg' 
        },
        leftLifeOfMe(){
            return 3 - this.lifeOfMe
        },
        leftLifeOfCom(){
            return 3 - this.lifeOfCom
        }
    },
    watch:{
        count(sec){
            if(sec === 0){
                this.selectCom()

                this.whoIsWin()

                this.count = 3
                this.isSelectable = true

                this.updateLogs()
                
            }
        },
        lifeOfMe(life){
            if(life === 0){
                this.endGame("패배 하였습니다.")
            }
        },
        lifeOfCom(life){
            if(life === 0){
                this.endGame("승리 하였습니다.")
            }
        }
    },
    methods:{
        startGame(){
            this.isSelectable = false
            if(this.myChoice === null){
                alert('선택한 값이 없습니다.')
                this.isSelectable = true
            }else{
                const countDown = setInterval(() =>{
                    this.count--
                    if(this.count === 0 ){
                        clearInterval(countDown)
                    }
                },1000)
            }
        },
        selectCom(){
            let number = Math.random()
            if(number < 0.33){
                this.comChoice = 'scissor'
            }else if(number < 0.66){
                this.comChoice = 'rock'
            }else{
                this.comChoice = 'paper'
            }
        },
        whoIsWin(){
            if(this.myChoice === this.comChoice) this.winner = 'no one'
                else if(this.myChoice === 'rock' && this.comChoice === 'scissor') this.winner = 'me'
                else if(this.myChoice === 'scissor' && this.comChoice === 'paper') this.winner = 'me'
                else if(this.myChoice === 'paper' && this.comChoice === 'rock') this.winner = 'me'
                else if(this.myChoice === 'scissor' && this.comChoice === 'rock') this.winner = 'com'
                else if(this.myChoice === 'paper' && this.comChoice === 'scissor') this.winner = 'com'
                else if(this.myChoice === 'rock' && this.comChoice === 'paper') this.winner = 'com'
                else this.winner = 'error'

                if(this.winner === 'me'){
                    this.lifeOfCom--
                }else if(this.winner === 'com'){
                    this.lifeOfMe--
                }
                
        },
        updateLogs(){
            let log = {
                message : `You : ${this.myChoice}, Computer: ${this.comChoice}`,
                winner : this.winner
            }
            this.logs.unshift(log);
        },
        endGame(message){
            setTimeout(()=>{
                confirm(message)
                this.lifeOfMe = 3
                this.lifeOfCom = 3
                this.myChoice = null
                this.comChoice = null
                this.winner = null
                this.logs = []
            },500)
        }
    }
})