import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import OAuth from '../components/OAuth';
import Button from '../shared/Button'
import FormError from '../shared/FormError';

import { signInUser } from '../store';
import { useForm } from '../hooks/form-hook';
import { VALIDATORS } from '../utils/types';

export default function Auth() {
  return (
    <div>Auth</div>
  )
}
