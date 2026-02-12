<template>
  <div>
    <!-- -->
    <Title title="ตรวจสอบคะแนน ออกแบบและเทคโนโลยี 2568/2" />
    <div class="container">
      <div class="searchBar">
        <input
          @click="
            stdID = '';
            err = false;
          "
          type="text"
          placeholder="กรอกเลขประจำตัว"
          v-model="stdID"
        />
        <p class="btn" @click="searchScore()">ค้นหาคะแนน</p>
      </div>
      <h3 class="error" v-if="err">ไม่พบข้อมูล</h3>
      <div class="display" v-if="Scores.length > 0 && stdID">
        <div class="information">
          <p>{{ Scores[0].studentID }}</p>
          <h3>{{ Scores[0].f_Name }} {{ Scores[0].l_Name }}</h3>
        </div>

        <div class="score">
          <table>
            <thead>
              <tr>
                <td>2D Sketch <br />(20 คะแนน)</td>
                <td>3D Cube <br />(20 คะแนน)</td>
                <td>Quiz <br />(20 คะแนน)</td>
                <td>Project <br />(40 คะแนน)</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="center">
                  <i
                    class="fa-duotone fa-regular fa-badge-check"
                    v-if="Scores[0].sketch"
                  ></i>
                  <i class="fa-duotone fa-regular fa-badge" v-else></i>
                </td>
                <td class="center">
                  <i
                    class="fa-duotone fa-regular fa-badge-check"
                    v-if="Scores[0].cube > 0"
                  ></i>
                  <i class="fa-duotone fa-regular fa-badge" v-else></i>
                </td>
                <td class="center">
                  <i
                    class="fa-duotone fa-regular fa-badge-check"
                    v-if="Scores[0].quiz > 0"
                  ></i>
                  <i class="fa-duotone fa-regular fa-badge" v-else></i>
                </td>
                <td class="center">
                  <i
                    class="fa-duotone fa-regular fa-badge-check"
                    v-if="Scores[0].project > 0"
                  ></i>
                  <i class="fa-duotone fa-regular fa-badge" v-else></i>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="lastUpdate">Last Update: {{ lastUpdate() }}</p>
        </div>

        <div class="grade">
          เกรดที่คาดว่าจะได้รับ
          <h2>{{ grading.grade }}</h2>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";

const stdID = ref();
const err = ref(false);

const lastUpdate = () => {
  dayjs.extend(relativeTime);
  return dayjs(Scores.value[0].UpdatedAt).fromNow();
};

const Scores = ref([]);
const grading = computed(() => {
  const score = Scores.value[0];
  const total = score.cube + score.quiz + score.sketch + score.project;

  if (total >= 80) return { total: total, grade: 4 };
  if (total >= 75) return { total: total, grade: 3.5 };
  if (total >= 70) return { total: total, grade: 3 };
  if (total >= 65) return { total: total, grade: 2.5 };
  if (total >= 60) return { total: total, grade: 2 };
  if (total >= 55) return { total: total, grade: 1.5 };
  if (total >= 50) return { total: total, grade: 1 };

  return { total: total, grade: 0 };
});

const searchScore = () => {
  if (!stdID) {
    return;
  }

  const options = {
    method: "GET",
    url: "https://ndb.3xbun.com/api/v2/tables/mv3bon2e35ra87d/records",
    params: {
      offset: "0",
      limit: "25",
      where: `where=(studentID,eq,${stdID.value})`,
      viewId: "vwl4xqu0vpq7ablz",
    },
    headers: {
      "xc-token": "wU0uyFeODMGzOqqkIUethPYhnZn_FqXXgifuiXWu",
    },
  };

  axios
    .request(options)
    .then((res) => {
      if (res.data.list.length <= 0) {
        err.value = true;
      }
      Scores.value = res.data.list;
    })
    .catch((err) => (err.value = true));
};
</script>

<style lang="css" scoped>
table {
  width: 100%;
}

thead {
  font-weight: bold;
  text-align: center;
}

td.center {
  text-align: center;
}
.searchBar {
  display: flex;
  gap: 1em;
  margin-bottom: 2em;
}

input {
  width: 70%;
  border-radius: 0.5em;
  border: none;
  padding-left: 1em;
  font-family: inherit;
}

p.btn {
  background-color: var(--primary);
  width: 30%;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  text-align: center;
}

.information,
.grade {
  text-align: center;
}

.score,
.information,
.grade {
  background-color: #1a1f31;
  border-radius: 0.5em;
  padding: 1em;
  margin-bottom: 1em;
}

td {
  width: 25%;
}

.fa-badge-check {
  color: rgb(123, 235, 123);
}

.lastUpdate {
  margin-top: 1em;
  text-align: right;
  color: var(--light);
}

.error {
  color: var(--light);
  text-align: center;
}
</style>
