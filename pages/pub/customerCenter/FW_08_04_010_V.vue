<template>
  <div>
    <Tabs default-value="privacy" class="inner mt-[1.6rem] w-full md:mt-16">
      <div class="w-full overflow-auto">
        <TabsList class="justify-start">
          <TabsTrigger value="privacy" @click="changeTitle('서비스 이용약관')"
            >서비스이용약관</TabsTrigger
          >
          <TabsTrigger value="policy" @click="changeTitle('개인정보처리방침')"
            >개인정보처리방침</TabsTrigger
          >
          <TabsTrigger value="email" @click="changeTitle('이메일무단수집거부')"
            >이메일무단수집거부</TabsTrigger
          >
          <TabsTrigger
            value="location"
            @click="changeTitle('위치기반서비스이용약관')"
            >위치기반서비스이용약관</TabsTrigger
          >
        </TabsList>
      </div>
      <TabsContent class="tabinner" value="privacy">
        <div class="md:ml-auto md:w-[36rem]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="개정 내역" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last">2024년 7월2일 개정</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="round-box mb:mt-8 mt-[2.4rem] p-8 md:p-16">
          <!-- 서비스 이용약관 예시 -->
          <service></service>
          <!-- 0109 : 버튼 위치 변경 -->
          <p class="mt-8">
            <NuxtLink class="btn-next">
              <span>2024.07.02</span>
              <span>2024.09.06</span>
              개정 안내
            </NuxtLink>
          </p>
        </div>
      </TabsContent>
      <TabsContent class="tabinner" value="policy">
        <div class="md:ml-auto md:w-[36rem]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="개정 내역" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last">2024년 7월2일 개정</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="round-box mb:mt-8 mt-[2.4rem] p-8 md:p-16">
          <!-- 이용약관 예시 -->
          <policy></policy>
          <!-- 0109 : 버튼 위치 변경 -->
          <p class="mt-8">
            <NuxtLink class="btn-next">
              <span>2024.07.02</span>
              <span>2024.09.06</span>
              개정 안내
            </NuxtLink>
          </p>
        </div>
      </TabsContent>
      <TabsContent class="tabinner" value="email">
        <div class="md:ml-auto md:w-[36rem]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="개정 내역" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last">2024년 7월2일 개정</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="round-box mb:mt-8 mt-[2.4rem] p-8 md:p-16">
          <!-- 이용약관 예시 -->
          <email></email>
        </div>
      </TabsContent>
      <TabsContent class="tabinner" value="location">
        <div class="md:ml-auto md:w-[36rem]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="개정 내역" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last">2024년 7월2일 개정</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="round-box mb:mt-8 mt-[2.4rem] p-8 md:p-16">
          <!-- 이용약관 예시 -->
          <location></location>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import service from "@/components/pub/terms/service.vue";
import policy from "@/components/pub/terms/policy.vue";
import email from "@/components/pub/terms/email.vue";
import location from "@/components/pub/terms/location.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const changeTitle = (title: string) => {
  stores.layout.$setPageTitle(title);
};

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("004004");
  stores.layout.$setPageTitle("서비스 이용약관");
});
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  .tabinner {
    padding-left: 0;
    padding-right: 0;
    width: 98rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
