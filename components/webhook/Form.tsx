import { InputWithLabel } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { maxLengthPolicies } from '@/lib/common';
import type { FormikConfig } from 'formik';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import * as Yup from 'yup';
import type { WebhookFormSchema } from 'types';

import { EventTypes } from '@/components/webhook';
import Modal from '../shared/Modal';

interface FormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  initialValues: WebhookFormSchema;
  onSubmit: FormikConfig<WebhookFormSchema>['onSubmit'];
  title: string;
  editMode?: boolean;
}

const Form = ({
  visible,
  setVisible,
  initialValues,
  onSubmit,
  title,
  editMode = false,
}: FormProps) => {
  const formik = useFormik<WebhookFormSchema>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required().max(maxLengthPolicies.webhookDescription),
      url: Yup.string().required().url().max(maxLengthPolicies.webhookEndpoint),
      eventTypes: Yup.array().min(1, 'Please choose at least one event type'),
    }),
    initialValues,
    enableReinitialize: true,
    onSubmit,
    validateOnBlur: false,
  });

  const { t } = useTranslation('common');

  const toggleVisible = () => {
    setVisible(!visible);
    formik.resetForm();
  };

  return (
    <Modal open={visible} close={toggleVisible}>
      <form onSubmit={formik.handleSubmit} method="POST">
        <Modal.Header>{title}</Modal.Header>
        <Modal.Description>{t('webhook-create-desc')}</Modal.Description>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <InputWithLabel
              name="name"
              label="Description"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Description of what this endpoint is used for."
              error={formik.errors.name}
            />
            <InputWithLabel
              name="url"
              label="Endpoint"
              onChange={formik.handleChange}
              value={formik.values.url}
              placeholder="https://api.example.com/svix-webhooks"
              error={formik.errors.url}
              descriptionText="The endpoint URL must be HTTPS"
            />
            <div className="h-px w-full bg-border/40" />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('events-to-send')}
              </span>
              <p className="text-sm text-muted-foreground">
                {t('events-description')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <EventTypes
                  onChange={formik.handleChange}
                  values={initialValues['eventTypes']}
                  error={formik.errors.eventTypes}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setVisible(!visible);
            }}
            size="md"
          >
            {t('close')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={formik.isSubmitting}
            size="md"
            fullWidth={false}
            disabled={!formik.dirty || !formik.isValid}
          >
            {editMode ? t('update-webhook') : t('create-webhook')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Form;
