from rest_framework import viewsets, permissions
from .serializers import LeadSerializer
from .models import Lead


class LeadViewSet(viewsets.ModelViewSet):
  # queryset = Lead.objects.all()
  serializer_class = LeadSerializer
  permission_classes = (permissions.IsAuthenticated, )

  def get_queryset(self):
    return self.request.user.leads.all()

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
