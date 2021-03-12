import Input from '../../../components/Input/Input';
import { validate } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';

const CarForm = props => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 3 }]
    },
    description: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 10 }]
    },
    city: {
      value: '',
      error: '',
      showError: false,
      rules: ['required']
    },
    doors: {
      value: 2,
      error: '',
      showError: false,
      rules: ['required']
    },
    features: {
      value: [],
      error: '',
      showError: false
    },
    image: {
      value: null,
      error: '',
      showError: false
    },
    status: {
      value: 0,
      error: '',
      showError: false,
      rules: ['required']
    }
  });

  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: error
      }
    });
  }
  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      props.onSubmit({
        name: form.name.value,
        description: form.description.value,
        city: form.city.value,
        doors: form.doors.value,
        features: form.features.value,
        status: form.status.value,
        user_id: auth.userId
      });
    } catch (ex) {
      console.log(ex.response);
    }

    setLoading(false);
  }

  useEffect(() => {
    const newForm = { ...form };
    for (const key in props.car) {
      newForm[key].value = props.car[key];
    }
    setForm(newForm);
  }, [props.car]);

  return (
    <form onSubmit={submit}>
      <Input
        label="Marka"
        value={form.name.value}
        onChange={val => changeHandler(val, 'name')}
        error={form.name.error}
        showError={form.name.showError} />

      <Input
        label="Opis"
        type="textarea"
        value={form.description.value}
        onChange={val => changeHandler(val, 'description')}
        error={form.description.error}
        showError={form.description.showError} />

      <Input
        label="Miejscowość"
        value={form.city.value}
        onChange={val => changeHandler(val, 'city')}
        error={form.city.error}
        showError={form.city.showError} />

      <Input
        label="Ilość drzwi"
        value={form.doors.value}
        type="select"
        onChange={val => changeHandler(val, 'doors')}
        options={[
          { value: 1, label: 2 },
          { value: 2, label: 3 },
          { value: 3, label: 4 },
          { value: 4, label: 5 },
        ]}
        error={form.doors.error}
        showError={form.doors.showError} />

      <h4>Udogodnienia</h4>
      <Input
        type="checkbox"
        value={form.features.value}
        onChange={val => changeHandler(val, 'features')}
        options={[
          { value: 'USB', label: 'USB' },
          { value: 'klimatyzacja', label: 'Klimatyzacja' },
          { value: 'nawigacja', label: 'Nawigacja' },
        ]}
        error={form.features.error}
        showError={form.features.showError} />

      <h4>Zdjęcie</h4>
      <Input
        type="file"
        onChange={val => changeHandler(val, 'image')}
        error={form.image.error}
        showError={form.image.showError} />

      <h4>Status</h4>
      <Input
        type="radio"
        name="status"
        value={form.status.value}
        onChange={val => changeHandler(val, 'status')}
        options={[
          { value: '1', label: 'Aktywny' },
          { value: '0', label: 'Ukryty' },
        ]}
        error={form.status.error}
        showError={form.status.showError} />

      <div className="text-right">
        <LoadingButton
          loading={loading}
          className="btn-success">
          {props.buttonText}!
        </LoadingButton>
      </div>

    </form>
  );
}

export default CarForm;