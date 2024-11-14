<template>
    <el-dialog title="订单信息" width="50%" modal append-to-body align-center :destroy-on-close="true" :lock-scroll="true"
        :close-on-press-escape="false" :close-on-click-modal="false" v-model="localIsShow" :before-close="closeDialog">
        <div class="look-dialog-content">
            <!-- {{ data }} -->
            <div v-for="(item, inde) in paramName" :key="inde" class="item-box">
                <span>{{ item.label }}：</span>
                <span>{{ (data as any)[item.prop] }}</span>
            </div>
        </div>
    </el-dialog>
</template>
<script setup lang="ts" name="">
import type { OrdersDto } from '@/types/OrdersInter';
import { ref, watch } from 'vue';

const paramName = [
    {
        label: '订单号',
        prop: 'number'
    }, {
        label: '订单状态',
        prop: 'status',
    }, {
        label: '收货人',
        prop: 'consignee'
    }, {
        label: '联系电话',
        prop: 'phone'
    }, {
        label: '地址',
        prop: 'address'
    }, {
        label: '支付金额',
        prop: 'amount'
    }, {
        label: '下单时间',
        prop: 'orderTime'
    },
]

const props = defineProps<{
    isShow: boolean,
    data: OrdersDto
}>()

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeLookDialog']);



watch(() => props.isShow, (newVal) => {
    localIsShow.value = newVal;
});

const closeDialog = () => {
    emit('closeLookDialog', false);
};

</script>
<style lang="scss" scoped>
.look-dialog-content {
    .item-box {
        display: flex;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        text-align: left;
        margin-bottom: 14px;
        span:nth-child(1) {
            width: 96px;
        }
        span:nth-child(2) {
            flex: 1;
            color: #333333;
        }
    }
}
</style>