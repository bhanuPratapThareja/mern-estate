import { createAction } from "@reduxjs/toolkit";

export const onConfirm = createAction('modal/confirm')
export const onCancel= createAction('modal/cancel')