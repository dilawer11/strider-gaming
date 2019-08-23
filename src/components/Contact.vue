<template>
      <div id="contact" class="large-margin container">
            <div class="row heading tiny-margin">
                <div class="col-md-auto">
                    <h1 class="animation-element slide-down">GET IN <span class="colored">TOUCH</span></h1>
                </div>
                <div class="col">
                    <hr class="animation-element extend">
                </div>
            </div>
            <div class="">
                <div class="row small-margin">
                    <div class="col-md-11">
                        <p>We would love to hear from you.</p><br>
                        <p>Become a part of our community of gamers <a href="https://discord.gg/G3M674t">Discord Link</a></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h2 class="short-hr-left">LEAVE US A MESSAGE</h2>
                        <form id="contactForm" data-toggle="validator">
                            <div class="form-group">
                                <!-- Name Field -->
                                <input v-model="name" type="text" id="name" placeholder="Name*" required size="35" data-error="Name is required">
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <!-- Email Field -->
                                <input type="email" v-model="email" id="email" placeholder="Email*" required size="35" data-error="Email is required">
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <!-- Message Field -->
                                <textarea id="message" v-model="message" name="message" placeholder="Message*" required data-error="Message cannot be empty"></textarea>
                                <p class="subtle">* required field</p>
                                <div class="help-block with-errors"></div>
                                <!-- Submit Button -->
                                <button @click="messageSubmit" class="button">SEND MESSAGE</button>
                                <!-- Success Message -->
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <h2 class="short-hr-left">OUR DETAILS</h2>
                        <div id="contact-info">
                            <ul>
                                <li><i class="fa fa-envelope"></i><p>Email: <span class="colored"><a href="mailto:stridergaming11@gmail.com">stridergaming11@gmail.com</a></span></p></li>
                                <li><i class="fa fa-phone"></i><p>Phone: <span class="colored"><a href="tel:+923234443331">+92 (323) 4443331</a></span></p></li>
                                <li><i class="fa fa-phone"></i><p>Phone: <span class="colored"><a href="tel:+923335393500">+92 (333) 5393500</a></span></p></li>
                            </ul>
                        </div>
                        <!-- Google Map -->
                        <!-- <div id="map-canvas"></div> -->
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'Contact',
    data(){
        return {
            name: null,
            email: null,
            message: null,
        }
    },
    methods:{
        messageSubmit(){
            db.collection('messages').add({
                name: this.name,
                email: this.email,
                message: this.message,
            }).then(resp => {
                alert('We have got you message. Somebody will get back to you soon')
            }).catch(err => {
                alert('An Error Occured')
            })
        }
    }
}
</script>

