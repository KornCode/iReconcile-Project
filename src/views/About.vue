<template>
  <div class="about">
    <div id="align_center" class="w-75">
      <b-card-group columns>
        <b-card
          title="Bill XX"
          :img-src="require('../assets/billgates.jpg')"
          img-alt="Image"
          img-top
          class="overflow-hidden shadow-sm"
          style="border-radius: 50% 20% / 10% 40%;"
        >
          <b-card-text>
            I did contract bookkeeping for non-profits part time in my 20s while
            playing guitar in an indie rock band. We incorporated as Sutro Li in
            2009 and moved all of our processes to iRecon in 2015.
          </b-card-text>
        </b-card>

        <b-card
          title="Donald YY"
          :img-src="require('../assets/trump.jpg')"
          img-alt="Image"
          img-top
          class="overflow-hidden shadow-sm"
          style="border-radius: 10% 40% / 50% 20%;"
        >
          <b-card-text>
            I've been doing bookkeeping for 25 years and I started my business
            21 years ago. I started with one location, one client at a time. Now
            I'm proud to say that we have more than 500 small business clients.
          </b-card-text>
          <b-card-text class="small text-muted"
            >Last updated 3 mins ago</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="primary"
          text-variant="white"
          class="overflow-hidden shadow-sm"
          style="border-radius: 50% 20% / 10% 40%;"
        >
          <blockquote class="card-blockquote">
            <p>
              iRecon removes your headache of dealing with paperwork and it will
              help you focus on your business.
            </p>
          </blockquote>
        </b-card>

        <b-card
          :img-src="require('../assets/nastaran2.png')"
          img-alt="Image"
          overlay
          class="overflow-hidden shadow-sm"
          style="border-radius: 50% 20% / 10% 40%;"
        />

        <b-card
          :img-src="require('../assets/nastaran.png')"
          img-alt="Image"
          img-top
          class="overflow-hidden shadow-sm"
          style="border-radius: 50% 20% / 10% 40%;"
        >
          <b-card-text>
            We decided to start fresh with iRecon. There is a tab on iRecon –
            Specialist – and you get connected to accountants.
          </b-card-text>
          <footer>
            <small class="text-muted">Nastaran Mousavi</small>
          </footer>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<style scoped>
#align_center {
  margin: 0 auto;
}
</style>
