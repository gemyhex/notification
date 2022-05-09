<template>
  <div class="timeline">
    <div class="arrows d-none d-lg-flex d-md-flex">
      <div class="arr-wrap">
        <div class="content">
          <div class="wrapper">
            <div class="sep"></div>
            <div class="texts">
              <h5>Employee</h5>
              <span>Document</span>
            </div>
          </div>
        </div>
        <div class="arrow step1">
          <span>08/05/2022</span>
        </div>
      </div>
      <div class="arr-wrap">
        <div class="content">
          <div class="wrapper">
            <div class="sep"></div>
            <div class="texts">
              <h5>Employee</h5>
              <span>Document</span>
            </div>
          </div>
        </div>
        <div class="arrow step2">
          <span>08/05/2022</span>
        </div>
      </div>
      <div class="arr-wrap">
        <div class="content">
          <div class="wrapper">
            <div class="sep"></div>
            <div class="texts">
              <h5>Employee</h5>
              <span>Document</span>
            </div>
          </div>
        </div>
        <div class="arrow step3">
          <span>08/05/2022</span>
        </div>
      </div>
      <div class="arr-wrap">
        <div class="content">
          <div class="wrapper">
            <div class="sep"></div>
            <div class="texts">
              <h5>Employee</h5>
              <span>Document</span>
            </div>
          </div>
        </div>
        <div class="arrow step4">
          <span>08/05/2022</span>
        </div>
      </div>
      <div class="arr-wrap">
        <div class="content">
          <div class="wrapper">
            <div class="sep"></div>
            <div class="texts">
              <h5>Employee</h5>
              <span>Document</span>
            </div>
          </div>
        </div>
        <div class="arrow step5">
          <span>08/05/2022</span>
        </div>
      </div>
    </div>
    <div class="arrows-sm d-flex flex-column d-lg-none d-md-none justify-content-center">
      <div class="divid">
        <div class="arr-wrap-sm">
          <div class="content">
            <div class="wrapper">
              <div class="sep"></div>
              <div class="texts">
                <h5>Employee</h5>
                <span>Document</span>
              </div>
            </div>
          </div>
          <div class="arrow-sm step1">
            <span>08/05/2022</span>
          </div>
        </div>
        <div class="arr-wrap-sm">
          <div class="content">
            <div class="wrapper">
              <div class="sep"></div>
              <div class="texts">
                <h5>Employee</h5>
                <span>Document</span>
              </div>
            </div>
          </div>
          <div class="arrow-sm step2">
            <span>08/05/2022</span>
          </div>
        </div>
        <div class="arr-wrap-sm">
          <div class="content">
            <div class="wrapper">
              <div class="sep"></div>
              <div class="texts">
                <h5>Employee</h5>
                <span>Document</span>
              </div>
            </div>
          </div>
          <div class="arrow-sm step3">
            <span>08/05/2022</span>
          </div>
        </div>
        <div class="arr-wrap-sm">
          <div class="content">
            <div class="wrapper">
              <div class="sep"></div>
              <div class="texts">
                <h5>Employee</h5>
                <span>Document</span>
              </div>
            </div>
          </div>
          <div class="arrow-sm step4">
            <span>08/05/2022</span>
          </div>
        </div>
        <div class="arr-wrap-sm">
          <div class="content">
            <div class="wrapper">
              <div class="sep"></div>
              <div class="texts">
                <h5>Employee</h5>
                <span>Document</span>
              </div>
            </div>
          </div>
          <div class="arrow-sm step5">
            <span>08/05/2022</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <ul>
      <li>
        <span>May 8, 2022</span>
        <div class="content">
          <h3>Admin</h3>
          <p>Document Name Reqiured</p>
        </div>
      </li>
      <li>
        <span>May 8, 2022</span>
        <div class="content">
          <h3>Admin</h3>
          <p>Document Name Reqiured</p>
        </div>
      </li>
      <li>
        <span>May 8, 2022</span>
        <div class="content">
          <h3>Admin</h3>
          <p>Document Name Reqiured</p>
        </div>
      </li>
      <li>
        <span>May 8, 2022</span>
        <div class="content">
          <h3>Admin</h3>
          <p>Document Name Reqiured</p>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.timeline {
  /* width: 800px; */
  /* background-color: #072736; */

  /* padding: 30px 20px; */
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
}
.arrows {
  width: 100%;
  position: relative;
  min-height: 220px;
  margin: auto;
  padding: 6px;
  display: flex;
}
.arrows-sm {
  width: 60%;
  margin: auto;
  justify-content: center;
  align-items: center;
  position: relative;
  .divid {
    
    width: 1px;
    min-height: 1100px;
    background: transparent;
    .arr-wrap-sm:nth-child(1) {
      position: absolute;
      padding: 0 10px;
      top: 0;
      right: 0;
    }
    .arr-wrap-sm:nth-child(2) {
      position: absolute;
      padding: 0 10px;
      top: 20%;
      left: 0;
    }
    .arr-wrap-sm:nth-child(3) {
      position: absolute;
      padding: 0 10px;
      top: 40%;
      right: 0;
    }
    .arr-wrap-sm:nth-child(4) {
      position: absolute;
      padding: 0 10px;
      top: 60%;
      left: 0;
    }
    .arr-wrap-sm:nth-child(5) {
      position: absolute;
      padding: 0 10px;
      top: 80%;
      right: 0;
    }
  }
}

/* Arrows - i.e. the box and the wedge */
.arr-wrap-sm {
  // width: 50%;
  margin: 0 2%;
  min-height: 220px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.arr-wrap-sm .content {
  display: flex;
  position: absolute;
  padding: 0 10px;
}
.arr-wrap-sm .content .wrapper {
  position: relative;
  padding: 10px 0;
}
.arr-wrap {
  width: 16%;
  margin: 0 2%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.arr-wrap .content {
  display: flex;
  position: absolute;
  padding: 0 10px;
}
.arr-wrap .content .wrapper {
  position: relative;
  padding: 10px 0;
}
.arr-wrap .content h5 {
  font-size: 1.2rem;
  font-weight: bold;
}
.arr-wrap .content span {
  font-weight: 100;
  color: #7d7d7d;
}

.arr-wrap:nth-child(1) .content .sep {
  width: 1px;
  height: 100%;

  background: #ff390c;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff390c;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff390c;
  }
}
.arr-wrap:nth-child(2) .content .sep {
  width: 1px;
  height: 100%;

  background: #ff8000;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff8000;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff8000;
  }
}
.arr-wrap:nth-child(3) .content .sep {
  width: 1px;
  height: 100%;

  background: #00cc60;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00cc60;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00cc60;
  }
}
.arr-wrap:nth-child(4) .content .sep {
  width: 1px;
  height: 100%;

  background: #8d45b5;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8d45b5;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8d45b5;
  }
}
.arr-wrap:nth-child(5) .content .sep {
  width: 1px;
  height: 100%;

  background: #0682ff;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0682ff;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0682ff;
  }
}

.arr-wrap-sm:nth-child(1) .content .sep {
  width: 1px;
  height: 100%;

  background: #ff390c;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff390c;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff390c;
  }
}
.arr-wrap-sm:nth-child(2) .content .sep {
  width: 1px;
  height: 100%;

  background: #ff8000;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff8000;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff8000;
  }
}
.arr-wrap-sm:nth-child(3) .content .sep {
  width: 1px;
  height: 100%;

  background: #00cc60;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00cc60;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00cc60;
  }
}
.arr-wrap-sm:nth-child(4) .content .sep {
  width: 1px;
  height: 100%;

  background: #8d45b5;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8d45b5;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8d45b5;
  }
}
.arr-wrap-sm:nth-child(5) .content .sep {
  width: 1px;
  height: 100%;

  background: #0682ff;
  float: left;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0682ff;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0682ff;
  }
}

.arr-wrap .content .texts {
  float: left;
  margin: 0 10px;
}

.arr-wrap:nth-child(1) .content {
  top: 0;
  left: 0;
}
.arr-wrap:nth-child(2) .content {
  bottom: 0;
  left: 0;
}
.arr-wrap:nth-child(3) .content {
  top: 0;
  left: 0;
}
.arr-wrap:nth-child(4) .content {
  bottom: 0;
  left: 0;
}
.arr-wrap:nth-child(5) .content {
  top: 0;
  left: 0;
}

.arr-wrap-sm .content {
  top: 0;
  left: 0;
}
.arr-wrap-sm .content .wrapper {
  display: flex;
  .texts {
    margin: 0 10px;
  }
}

.arr-wrap:nth-child(1) .content {
  color: #ff390c;
}
.arr-wrap:nth-child(2) .content h5 {
  color: #ff8000;
}
.arr-wrap:nth-child(3) .content h5 {
  color: #00cc60;
}
.arr-wrap:nth-child(4) .content h5 {
  color: #8d45b5;
}
.arr-wrap:nth-child(5) .content h5 {
  color: #0682ff;
}
.arrow {
  padding: 10px 20px;
  position: relative;
  text-align: center;
}
.arrow-sm {
  padding: 10px 20px;
  position: relative;
  text-align: center;
}
.arrow:before {
  content: '';
  position: absolute;
  top: 50%;
  right: -50%;
  width: 55px;
  height: 3px;
  transform: translate(-50%, -50%);
}
.arrow.step5:before {
  display: none;
}

.arrow.step1:before {
  background: #ff390c;
}
.arrow.step2:before {
  background: #ff8000;
}
.arrow.step3:before {
  background: #00cc60;
}
.arrow.step4:before {
  background: #8d45b5;
}
.arrow:after {
  border-top: 22px solid transparent;
  border-bottom: 22px solid transparent;
  border-left: 17px solid transparent;
  content: '';
  height: 0;
  position: absolute;
  right: -17px;
  top: 0;
  width: 0;
  z-index: 2;
}
.arrow-sm:after {
  border-top: 22px solid transparent;
  border-bottom: 22px solid transparent;
  border-left: 17px solid transparent;
  content: '';
  height: 0;
  position: absolute;
  right: -17px;
  top: 0;
  width: 0;
  z-index: 2;
}
// .arrow-sm:nth-child(4):after {
//   left: -34px !important;
// }

/* .arrow:last-child:after {
  border: none;
  right: 0;
} */

/* Colour each section */
.step1 {
  background-color: #ff390c;
}

.step2 {
  background-color: #ff8000;
}

.step3 {
  background-color: #00cc60;
}
.step4 {
  background-color: #8d45b5;
}
.step5 {
  background-color: #0682ff;
}

/* Colour the wedge to match it's associated box */
.arrow.step1:after {
  border-left: 17px solid #ff390c;
}

.arrow.step2:after {
  border-left: 17px solid #ff8000;
}
.arrow.step3:after {
  border-left: 17px solid #00cc60;
}
.arrow.step4:after {
  border-left: 17px solid #8d45b5;
}
.arrow.step5:after {
  border-left: 17px solid #0682ff;
}

.arrow-sm.step1:after {
  border-left: 17px solid #ff390c;
}
.arrow-sm.step2:after {
  border-right: 17px solid #ff8000;
  left: -34px;
}
.arrow-sm.step3:after {
  border-left: 17px solid #00cc60;
}
.arrow-sm.step4:after {
  border-right: 17px solid #8d45b5;
  left: -34px;
}
.arrow-sm.step5:after {
  border-left: 17px solid #0682ff;
}

/* Typography */
.arrow span {
  color: #ffffff;
  position: relative;
  font-weight: bold;
}
</style>
