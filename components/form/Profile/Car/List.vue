<script setup lang="ts">
import { plainToClass } from "class-transformer";
import type { Form } from "vee-validate";
import { ProfileDataCar } from "@/types/common";
import type { CarSearchResponse } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";
import type {
  PropsType,
  PropsAuthType,
  ProfileForm,
  ProfileFormCar,
} from "@/types/components/form/Profile";

// uid
const uid = getCurrentInstance()?.uid;

// 상수
const { $constants } = useNuxtApp();
const isDev = $constants.isDev();

// props
const props = withDefaults(
  defineProps<{
    type?: PropsType;
    authType?: PropsAuthType;
    form?: InstanceType<typeof Form> | null;
    labels?: {
      [key: string]: string;
    };
    disabled?: boolean;
  }>(),
  {
    type: "add",
    authType: undefined,
    form: undefined,
    labels: () => ({}),
    disabled: false,
  },
);

// api
const { mutate, isPending } = useApiCarSearch(uid);

// state
const devName = ref("");
const carNumber = ref("");
const rep = ref("");
const list = ref<ProfileFormCar[]>([]);

// computed
const certifyList = computed<ProfileFormCar[]>(() => {
  if (list.value.length) {
    return list.value.filter(
      (item) =>
        item.crudType !== "D" &&
        (typeof item.certifyYn === "undefined" || item.certifyYn === "Y"),
    );
  } else {
    return [];
  }
});

// init
const init = () => {
  const values = props.form?.values as ProfileForm;

  if (!values) return;

  list.value = values.carList.map((item) => {
    const crudType = item.certifyYn !== "Y" ? "D" : item.crudType;

    if (item.certifyYn === "Y" && item.carRepCarYn === "Y") {
      rep.value = item.carNum;
    }

    return {
      ...item,
      crudType,
    } as ProfileFormCar;
  });
};

// add
const addItem = (data: CarSearchResponse) => {
  const editList = [...list.value];
  const i = editList.findIndex(
    (item) => item.crudType !== "D" && item.carFuelType === data.carFuel,
  );

  if (i > -1) {
    alertOpen({
      message: useT("alertMessage.038"),
    });
    return;
  }

  const addData = plainToClass(ProfileDataCar, {
    carRegServiceType: props.type === "add" ? "JOIN" : "",
    carRepCarYn: editList.length ? "N" : "Y",
    carNum: data.carNum,
    carFuelType: data.carFuel,
    carGbn: data.carGbn,
    carMakr: data.carVendor,
    carMkngYy: data.carYear,
    carModel: data.carModel,
    distinctNumber: data.distinctNumber,
  });

  if (!certifyList.value.length) {
    rep.value = addData.carNum;
  }

  editList.push(addData);

  list.value = editList;
  carNumber.value = "";

  updateRep();
};

// delete
const deleteItem = (data: ProfileFormCar) => {
  const editList = [...list.value];
  const i = editList.findIndex((item) => item.carNum === data.carNum);

  if (i > -1) {
    if (rep.value === editList[i].carNum) {
      rep.value = "";
    }

    if (editList[i].crudType === "C") {
      editList.splice(i, 1);
    } else {
      editList[i].crudType = "D";
    }
  }

  list.value = editList;

  updateRep();
};

// delete click
const deleteClick = (data: ProfileFormCar) => {
  alertOpen({
    message: useT("alertMessage.035"),
    buttons: [
      {
        type: "cancel",
      },
      {
        text: useT("alertButton.004"),
        callback: (closeFn) => {
          closeFn();
          deleteItem(data);
        },
      },
    ],
  });
};

// update rep
const updateRep = () => {
  const editList = [...list.value];

  editList.forEach((item) => {
    if (!item.crudType) {
      item.crudType = "U";
    }
    item.carRepCarYn = item.carNum === rep.value ? "Y" : "N";
  });

  list.value = editList;
};

// 조회 call
const search = useDebounceFn(() => {
  const values = props.form?.values as ProfileForm;

  mutate(
    {
      carNum: carNumber.value,
      name: devName.value || values.name,
    },
    {
      onSuccess: (data) => {
        addItem(data.data as CarSearchResponse);
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
}, 300);

// 조회 클릭
const searchClick = () => {
  if (isPending.value) return;
  search();
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// setup
init();

// watch
watch(list, () => {
  props.form?.setFieldValue("carList", list.value);
});
</script>

<template>
  <div>
    <div v-if="isDev" class="relative">
      <input
        v-model="devName"
        type="text"
        class="absolute right-0 top-[-2.6rem] z-10 w-40 border-2 border-solid border-red-600 text-center md:right-[21rem] md:top-0"
        title="명의자 이름"
      />
    </div>
    <div class="lb-small md:px-16">
      <FormField name="carList" class="hidden md:block">
        <FormItem>
          <FormValidation
            for="carSearch"
            :label="labels.carList"
            :label-attrs="{
              class: 'hidden md:block',
            }"
          >
            <FormControl>
              <div class="flex flex-row">
                <FormBasicInput
                  id="carSearch"
                  v-model="carNumber"
                  type="text"
                  class="flex-1"
                  :disabled="disabled"
                />
                <button
                  type="button"
                  class="btn-txt dgray ml-[.8rem] min-w-32 md:min-w-64"
                  :disabled="
                    disabled ||
                    isPending ||
                    !carNumber ||
                    certifyList.length >= 3
                  "
                  @click="searchClick"
                >
                  조회
                </button>
              </div>
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>
      <div class="md:pl-[11.7rem]">
        <RadioGroup
          v-if="certifyList.length"
          id="carList"
          v-model="rep"
          class="mt-[2.8rem] md:mt-[3.2rem]"
          @update:model-value="updateRep"
        >
          <BoardList :use-more="false">
            <template v-for="(item, i) in certifyList" :key="i">
              <FormProfileCarItem
                v-if="item.crudType !== 'D'"
                :data="item"
                :disabled="disabled"
                @delete="deleteClick"
              />
            </template>
          </BoardList>
        </RadioGroup>
        <div>
          <ul class="list-dot mt-[1.2rem] text-gray-600">
            <li>각 연료종별로 한대씩 등록할 수 있습니다.</li>
            <li>
              본인 명의가 아니거나 LPG/EV/수소 연료종이 아닌 차량의 경우 차량
              등록 서비스가 제한될 수 있습니다.
            </li>
            <li>
              택시 고객의경우 번호 앞 지역명도 포함하여 조회하여주십시오.
              (ex.서울21아2121)
            </li>
            <li>
              법인, 렌트 차량등은 고객센터를 통해 등록하여 주십시오. (1688-2121)
            </li>
          </ul>
        </div>
      </div>

      <CommonAlert ref="alertLayer" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.list-dis {
  background: #f8f8f8;
  border-color: #e8ecef;
}
.list-dis * {
  color: #858e96 !important;
}
.bar > * {
  font-size: 1.6rem;
  line-height: 2.2rem;
}
</style>
