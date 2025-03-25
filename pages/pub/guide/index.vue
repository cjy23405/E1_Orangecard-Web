<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import InputItem from "@/components/pub/InputItem.vue";
import DatePicker from "@/components/pub/DatePicker.vue";
import PhoneItem from "@/components/pub/PhoneItem.vue";
import EmailItem from "@/components/pub/EmailItem.vue";
import SearchItem from "@/components/pub/SearchItem.vue";
import AddressItem from "@/components/pub/AddressItem.vue";
import CarItem from "@/components/pub/CarItem.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/pub/Loading.vue";
// 레이아웃 선택
definePageMeta({
  layout: "pub-guide",
});
</script>

<template>
  <div class="guide-wrap">
    <h1>Markup Guide</h1>
    <section>
      <h2>Font</h2>
      <div class="area-con">
        <p class="fs-10">font-10</p>
        <p class="fs-12">font-12</p>
        <p class="fs-14">font-14</p>
        <p class="fs-16">font-16 : default</p>
        <p class="fs-16 bold">font-16 : default - bold</p>
        <p class="fs-18">font-18</p>
        <p class="fs-20">font-20</p>
        <p class="fs-22">font-22</p>
        <p class="fs-28">font-28</p>
        <p class="fs-32">font-32</p>
        <p class="fs-38">font-38</p>
      </div>
      <pre class="area_view">
&lt;p class="fs-16"&gt;font-16 : default&lt;/p&gt;
&lt;p class="fs-16 bold"&gt;font-16 : default - bold&lt;/p&gt;</pre
      >
    </section>
    <section>
      <h2>button</h2>
      <div class="area-con">
        <h3>btn-wrap</h3>
        <div class="btn-wrap">
          <button class="btn-txt primary">button</button>
          <button class="btn-txt gray">button</button>
          <button class="btn-txt dgray">button</button>
        </div>
        <h3>Disabled</h3>
        <div class="btn-wrap">
          <button class="btn-txt primary" disabled>button</button>
          <button class="btn-txt gray" disabled>button</button>
        </div>
        <h3>SmallSize</h3>
        <div class="btn-wrap">
          <button class="btn-txt primary small">button</button>
          <button class="btn-txt gray small">button</button>
        </div>
        <h3>MediumSize</h3>
        <div class="btn-wrap">
          <button class="btn-txt primary medium">button</button>
          <button class="btn-txt gray medium">button</button>
        </div>
        <h3>LargeSize</h3>
        <div class="btn-wrap">
          <button class="btn-txt primary large">button</button>
          <button class="btn-txt gray large">button</button>
        </div>
      </div>
      <pre class="area_view">
&lt;button class="btn-txt primary"&gt;button&lt;/button&gt;
&lt;button class="btn-txt gray"&gt;button&lt;/button&gt;
&lt;button class="btn-txt primary small"&gt;button&lt;/button&gt;
&lt;button class="btn-txt primary medium"&gt;button&lt;/button&gt;
&lt;button class="btn-txt primary large"&gt;button&lt;/button&gt;</pre
      >
      <pre class="area_view">
&lt;div class="btn-wrap"&gt;
    &lt;button class="btn-txt primary"&gt;button&lt;/button&gt;
    &lt;button class="btn-txt gray"&gt;button&lt;/button&gt;
&lt;/div&gt;</pre
      >
      <div class="area-con">
        <button class="btn-txt large onShadow">btn-shadow</button><br /><br />
        <button class="btn-txt medium gray next">btn-txt.gray.next</button>
        <button class="btn-txt medium white next">btn-txt.white.next</button
        ><br /><br />
        <button class="btn-txt dgray medium">btn-txt dgray</button>
        <br /><br />
        <button class="btn-more">btn-more</button>
        <button class="btn-more small">btn-more.small</button>
      </div>
      <pre class="area_view">
&lt;button class="btn-txt large onShadow"&gt;btn-shadow&lt;/button&gt;
&lt;button class="btn-txt medium gray next"&gt;btn-txt.gray.next&lt;/button&gt;
&lt;button class="btn-txt medium white next"&gt;btn-txt.white.next&lt;/button&gt;
&lt;button class="btn-txt dgray medium"&gt;btn-txt dgray&lt;/button&gt;

&lt;button class="btn-more"&gt;btn-more&lt;/button&gt;
&lt;button class="btn-more small"&gt;btn-more.small&lt;/button&gt;</pre
      >
    </section>
    <section>
      <h2>Radio / Checkbox</h2>
      <div class="area-con">
        <h3>Radio</h3>
        <radio-group class="ipt-line" default-value="rd01">
          <div class="ipt-item">
            <radio-group-item id="rd01" value="rd01"></radio-group-item>
            <label for="rd01">radio01</label>
          </div>
          <div class="ipt-item">
            <radio-group-item id="rd02" value="rd02"></radio-group-item>
            <label for="rd02">radio02</label>
          </div>
          <div class="ipt-item">
            <radio-group-item
              id="rd03"
              value="rd03"
              disabled
            ></radio-group-item>
            <label for="rd03">radio02</label>
          </div>
        </radio-group>
        <h3>Checkbox</h3>
        <div class="ipt-line">
          <div class="ipt-item">
            <checkbox id="chk01" class="ipt-check"></checkbox>
            <label for="chk01"
              >Checkbox01:longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglongtext</label
            >
          </div>
        </div>
        <div class="ipt-line">
          <div class="ipt-item">
            <checkbox id="chk02" class="ipt-check" disabled></checkbox>
            <label for="chk02">Checkbox02:disabled</label>
          </div>
        </div>
        <div class="ipt-line">
          <div class="ipt-item">
            <checkbox id="chk03" class="ipt-check noline"></checkbox>
            <label for="chk03">Checkbox03</label>
          </div>
          <div class="ipt-item">
            <checkbox id="chk04" class="ipt-check noline" disabled></checkbox>
            <label for="chk04">Checkbox04:disabled</label>
          </div>
        </div>
        <div class="ipt-line">
          <div class="ipt-item">
            <checkbox id="chk05" class="ipt-check noline"></checkbox>
            <label for="chk05">Checkbox05<span>sub-texts</span></label>
          </div>
        </div>
      </div>
      <pre class="area_view">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
&lt;radio-group class="ipt-line"&gt;
  &lt;div class="ipt-item"&gt;
    &lt;radio-group-item id="rd01" checked&gt;&lt;/radio-group-item&gt;
    &lt;label for="rd01"&gt;radio01&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="ipt-item"&gt;
    &lt;radio-group-item id="rd02"&gt;&lt;/radio-group-item&gt;
    &lt;label for="rd02"&gt;radio02&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="ipt-item"&gt;
    &lt;radio-group-item id="rd03" disabled&gt;&lt;/radio-group-item&gt;
    &lt;label for="rd03"&gt;radio02&lt;/label&gt;
  &lt;/div&gt;
&lt;/radio-group&gt;</pre
      >
      <pre class="area_view">
import { Checkbox } from "@/components/ui/checkbox";
&lt;div class="ipt-line"&gt;
  &lt;div class="ipt-item"&gt;
    &lt;checkbox id="chk01" class="ipt-check"&gt;&lt;/checkbox&gt;
    &lt;label for="chk01"
      &gt;Checkbox01:longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglongtext&lt;/label
    &gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="ipt-line"&gt;
  &lt;div class="ipt-item"&gt;
    &lt;checkbox id="chk02" class="ipt-check" disabled&gt;&lt;/checkbox&gt;
    &lt;label for="chk02"&gt;Checkbox02:disabled&lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="ipt-line"&gt;
  &lt;div class="ipt-item"&gt;
    &lt;checkbox id="chk03" class="ipt-check noline"&gt;&lt;/checkbox&gt;
    &lt;label for="chk03"&gt;Checkbox03&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="ipt-item"&gt;
    &lt;checkbox id="chk04" class="ipt-check noline" disabled&gt;&lt;/checkbox&gt;
    &lt;label for="chk04"&gt;Checkbox04:disabled&lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="ipt-line"&gt;
  &lt;div class="ipt-item"&gt;
    &lt;checkbox id="chk05" class="ipt-check noline"&gt;&lt;/checkbox&gt;
    &lt;label for="chk05"&gt;Checkbox05&lt;span&gt;sub-texts&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre
      >
    </section>
    <section>
      <h2>Input</h2>
      <div class="area-con">
        <input-item :placeholder="'InputText'"></input-item>
        <input-item
          :type="'password'"
          :placeholder="'InputPassword'"
        ></input-item>
        <input-item :disabled="true" :value="'InputDisabled'"></input-item>
        <input-item
          :placeholder="'InputText:ErrorText'"
          :error-text="'errorText'"
        ></input-item>
      </div>
      <pre class="area_view">
import InputItem from "@/components/pub/InputItem.vue";
&lt;input-item :placeholder="'InputText'"&gt;&lt;/input-item&gt;
&lt;input-item :type="'password'" :placeholder="'InputPassword'"&gt;&lt;/input-item&gt;
&lt;input-item :disabled="true" :value="'InputDisabled'"&gt;&lt;/input-item&gt;
&lt;input-item :placeholder="'InputText:ErrorText'" :error-text="'errorText'"&gt;&lt;/input-item&gt;</pre
      >
      <div class="area-con">
        <search-item></search-item>
        <car-item></car-item>
        <phone-item
          v-if="true"
          :label-text="'휴대폰번호'"
          :required="true"
          :is-error="true"
        ></phone-item>
        <email-item :label-text="'이메일'" :is-error="true"></email-item>
        <address-item
          :label-text="'주소'"
          :required="true"
          :is-error="true"
        ></address-item>
      </div>
      <pre class="area_view">
import SearchItem from "@/components/pub/SearchItem.vue";
import CarItem from "@/components/pub/CarItem.vue";
import PhoneItem from "@/components/pub/PhoneItem.vue";
import EmailItem from "@/components/pub/EmailItem.vue";
import AddressItem from "@/components/pub/AddressItem.vue";
&lt;search-item&gt;&lt;/search-item&gt;
&lt;phone-item
  v-if="true"
  :label-text="'휴대폰번호'"
  :required="true"
  :is-error="true"
&gt;&lt;/phone-item&gt;
&lt;email-item :label-text="'이메일'" :is-error="true"&gt;&lt;/email-item&gt;
&lt;address-item
  :label-text="'주소'"
  :required="true"
  :is-error="true"
&gt;&lt;/address-item&gt;
</pre
      >
    </section>
    <section>
      <h2>Select / Datepicker</h2>
      <div class="area-con">
        <h3>Select</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="placehoder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple"> Apple </SelectItem>
            <SelectItem value="apple2"> Apple2</SelectItem>
          </SelectContent>
        </Select>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="placehoder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple"> Apple </SelectItem>
            <SelectItem value="apple2"> Apple2</SelectItem>
          </SelectContent>
        </Select>

        <h3>DatePicker</h3>
        <date-picker></date-picker>
        <date-picker :disabled="true"></date-picker>
      </div>
      <pre class="area_view">
&lt;Select&gt;
  &lt;SelectTrigger&gt;
    &lt;SelectValue placeholder="placehoder" /&gt;
  &lt;/SelectTrigger&gt;
  &lt;SelectContent&gt;
    &lt;SelectItem value="apple"&gt; Apple &lt;/SelectItem&gt;
    &lt;SelectItem value="apple2"&gt; Apple2&lt;/SelectItem&gt;
  &lt;/SelectContent&gt;
&lt;/Select&gt;</pre
      >
      <pre class="area_view">&lt;date-picker&gt;&lt;/date-picker&gt;</pre>
    </section>
    <section>
      <h2>List</h2>
      <div class="area-con">
        <ul class="list-dash">
          <li>list-dash</li>
        </ul>
        <ul class="list-dot">
          <li>list-dot</li>
        </ul>
        <ul class="list-dot text-gray-600">
          <li>list-dot</li>
        </ul>
      </div>
      <pre class="area_view">
&lt;ul class="list-dash"&gt;
  &lt;li&gt;list-dash&lt;/li&gt;
&lt;/ul&gt;
&lt;ul class="list-dot"&gt;
  &lt;li&gt;list-dot&lt;/li&gt;
&lt;/ul&gt;
&lt;ul class="list-dot text-gray-600"&gt;
  &lt;li&gt;list-dot&lt;/li&gt;
&lt;/ul&gt;</pre
      >
    </section>
    <section>
      <h2>Nodata</h2>
      <div class="area-con">
        <div class="nodata">
          <p>조회 결과가 없습니다.</p>
        </div>
      </div>
      <pre class="area_view">
&lt;div class="nodata"&gt;
  &lt;p&gt;조회 결과가 없습니다.&lt;/p&gt;
&lt;/div&gt;</pre
      >
    </section>
    <section>
      <h2>Loading</h2>
      <div class="area-con relative h-[40rem]">
        <loading class="absolute"></loading>
      </div>
      <pre class="area_view">
import Loading from "@/components/pub/Loading.vue";
&lt;loading&gt;&lt;/loading&gt;
      </pre>
    </section>
    <!-- <section>
      <h2>Table</h2>
      <div class="area-con"></div>
      <pre class="area_view"></pre>
    </section>
    -->
  </div>
</template>

<style lang="css" scoped>
.guide-wrap {
  padding: 2rem;
}

section + section {
  margin-top: 1rem;
}
h1 {
  display: block;
  padding-bottom: 14px;
  color: #666;
  font-size: 50px;
  font-weight: 700;
}
h2 {
  margin: 20px 0 10px;
  padding: 13px 12px;
  color: #333;
  border: 1px solid #e1e1e1;
  background: #f6f6f6;
}
h3 {
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  margin: 1rem 0;
}

.area-con {
  overflow: auto;
  margin: 0 0 10px;
  padding: 9px;
  border: 1px dashed #bbb;
  font-size: 12px;
}
.area_view {
  overflow: auto;
  margin: 0 0 10px;
  padding: 15px 10px;
  background-color: #999;
  color: #fff;
  font: 11px Tahoma;
}
</style>
