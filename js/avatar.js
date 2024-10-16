const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChoser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');

fileChoser.addEventListener('change', () => {
  const file = fileChoser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
