import './styles.scss';
import 'bootstrap';
import onChange from 'on-change';
import * as yup from 'yup';

const urlForm = document.getElementById('url-input');

const formState = {
  state: 'empty',
};

const addedUrls = [];

const render = (__path, value) => {
  const feedback = document.querySelector('.feedback');
  if (value === 'valid') {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
  }
  if (value === 'wrong_format') {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'Ресурс не содержит валидный RSS';
  }
  if (value === 'wrong_url') {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
  }
  if (value === 'double_url') {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'RSS уже существует';
  }
};

const watchedState = onChange(formState, render);

const form = document.querySelector('.rss-form');

const schema = yup.object().shape({
  link: yup
    .string()
    .url('wrong_url')
    .test('is-rss-link', 'wrong_format', (value) => value.endsWith('.rss'))
    .required('Поле "link" обязательно для заполнения'),
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const url = { link: urlForm.value };
  schema
    .validate(url)
    .then(() => {
      const haventThisUrl = addedUrls.indexOf(url.link) === -1;
      if (haventThisUrl) {
        addedUrls.push(url.link);
        watchedState.state = 'valid';
      } else {
        watchedState.state = 'double_url';
      }
    })
    .catch((errors) => {
      const [errorName] = errors.errors;
      watchedState.state = errorName;
    });
});
